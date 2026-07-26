import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connectDB";
import { LoanApplication } from "@/models/LoanApplication";
import { LEAD_STATUSES } from "@/lib/crm/constants";

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function startOfWeek(d: Date) {
  const x = startOfDay(d);
  const day = x.getDay();
  x.setDate(x.getDate() - day);
  return x;
}
function startOfMonth(d: Date) {
  const x = startOfDay(d);
  x.setDate(1);
  return x;
}

export async function GET() {
  try {
    await connectDB();
    const now = new Date();

    const [
      total,
      todayCount,
      weekCount,
      monthCount,
      statusCounts,
      employmentCounts,
      cityCounts,
      last14DaysRaw,
      readinessDocs,
      loanAmountDocs,
      weeklyRaw,
      monthlyRaw,
      employeeAgg,
    ] = await Promise.all([
      LoanApplication.countDocuments(),
      LoanApplication.countDocuments({ createdAt: { $gte: startOfDay(now) } }),
      LoanApplication.countDocuments({ createdAt: { $gte: startOfWeek(now) } }),
      LoanApplication.countDocuments({ createdAt: { $gte: startOfMonth(now) } }),
      LoanApplication.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      LoanApplication.aggregate([{ $group: { _id: "$employment.employmentType", count: { $sum: 1 } } }]),
      LoanApplication.aggregate([
        { $group: { _id: "$personal.city", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 8 },
      ]),
      LoanApplication.aggregate([
        { $match: { createdAt: { $gte: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000) } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      LoanApplication.find({ loanReadinessScore: { $exists: true } }).select("loanReadinessScore").lean(),
      LoanApplication.find().select("loan.requiredLoanAmount").lean(),
      LoanApplication.aggregate([
        { $match: { createdAt: { $gte: new Date(now.getTime() - 8 * 7 * 24 * 60 * 60 * 1000) } } },
        {
          $group: {
            _id: { $dateToString: { format: "%G-W%V", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      LoanApplication.aggregate([
        { $match: { createdAt: { $gte: new Date(now.getFullYear(), now.getMonth() - 5, 1) } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      LoanApplication.aggregate([
        { $match: { assignedEmployee: { $exists: true, $ne: null } } },
        {
          $group: {
            _id: "$assignedEmployee",
            totalAssigned: { $sum: 1 },
            approved: { $sum: { $cond: [{ $in: ["$status", ["Approved", "Disbursed"]] }, 1, 0] } },
          },
        },
        { $sort: { totalAssigned: -1 } },
        { $limit: 5 },
      ]),
    ]);

    const statusMap: Record<string, number> = Object.fromEntries(LEAD_STATUSES.map((s) => [s, 0]));
    for (const row of statusCounts) statusMap[row._id] = row.count;

    // Fill in the last 14 days so the chart has no gaps for days with zero leads
    const dailyMap: Record<string, number> = {};
    for (const row of last14DaysRaw) dailyMap[row._id] = row.count;
    const dailyLeads = Array.from({ length: 14 }).map((_, i) => {
      const d = new Date(now.getTime() - (13 - i) * 24 * 60 * 60 * 1000);
      const key = d.toISOString().slice(0, 10);
      return { date: key, count: dailyMap[key] || 0 };
    });

    const readinessBuckets = { "0-40": 0, "41-60": 0, "61-80": 0, "81-100": 0 };
    for (const doc of readinessDocs) {
      const score = doc.loanReadinessScore || 0;
      if (score <= 40) readinessBuckets["0-40"]++;
      else if (score <= 60) readinessBuckets["41-60"]++;
      else if (score <= 80) readinessBuckets["61-80"]++;
      else readinessBuckets["81-100"]++;
    }

    const amountBuckets = {
      "< ₹1L": 0,
      "₹1L - 3L": 0,
      "₹3L - 5L": 0,
      "₹5L - 10L": 0,
      "> ₹10L": 0,
    };
    for (const doc of loanAmountDocs) {
      const amt = doc.loan?.requiredLoanAmount || 0;
      if (amt < 100000) amountBuckets["< ₹1L"]++;
      else if (amt < 300000) amountBuckets["₹1L - 3L"]++;
      else if (amt < 500000) amountBuckets["₹3L - 5L"]++;
      else if (amt < 1000000) amountBuckets["₹5L - 10L"]++;
      else amountBuckets["> ₹10L"]++;
    }

    const weeklyLeads = weeklyRaw.map((r: any) => ({ week: r._id, count: r.count }));
    const monthlyLeads = monthlyRaw.map((r: any) => ({
      month: new Date(`${r._id}-01`).toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
      count: r.count,
    }));

    // Conversion funnel follows the natural lead-progression order (not the
    // same as the full status list, which includes the terminal "Rejected"
    // branch alongside the happy path).
    const funnelOrder = ["New", "Contacted", "Interested", "Documents Pending", "Verification", "Approved", "Disbursed"];
    const conversionFunnel = funnelOrder.map((status) => ({ stage: status, count: statusMap[status] || 0 }));

    const avgLoanAmount = loanAmountDocs.length
      ? Math.round(loanAmountDocs.reduce((sum, d: any) => sum + (d.loan?.requiredLoanAmount || 0), 0) / loanAmountDocs.length)
      : 0;
    const avgReadinessScore = readinessDocs.length
      ? Math.round(readinessDocs.reduce((sum, d: any) => sum + (d.loanReadinessScore || 0), 0) / readinessDocs.length)
      : 0;

    // "Top performing employees" — real counts from placeholder assignment
    // data. Once a real employee system exists, this aggregation stays the
    // same; only the source of `assignedEmployee` values changes.
    const topEmployees = employeeAgg.map((r: any) => ({
      name: r._id,
      totalAssigned: r.totalAssigned,
      approved: r.approved,
      conversionRate: r.totalAssigned > 0 ? Math.round((r.approved / r.totalAssigned) * 100) : 0,
    }));

    return NextResponse.json({
      success: true,
      cards: {
        total,
        today: todayCount,
        thisWeek: weekCount,
        thisMonth: monthCount,
        pending: statusMap["New"] || 0,
        contacted: statusMap["Contacted"] || 0,
        documentsPending: statusMap["Documents Pending"] || 0,
        approved: statusMap["Approved"] || 0,
        rejected: statusMap["Rejected"] || 0,
        disbursed: statusMap["Disbursed"] || 0,
      },
      charts: {
        dailyLeads,
        weeklyLeads,
        monthlyLeads,
        statusDistribution: LEAD_STATUSES.map((s) => ({ status: s, count: statusMap[s] || 0 })),
        employmentType: employmentCounts.map((r) => ({ type: r._id || "Unknown", count: r.count })),
        cities: cityCounts.map((r) => ({ city: r._id || "Unknown", count: r.count })),
        readinessDistribution: Object.entries(readinessBuckets).map(([range, count]) => ({ range, count })),
        loanAmountDistribution: Object.entries(amountBuckets).map(([range, count]) => ({ range, count })),
        conversionFunnel,
      },
      analytics: {
        avgLoanAmount,
        avgReadinessScore,
        topEmployees,
      },
    });
  } catch (err) {
    console.error("[admin/stats] GET error:", err);
    return NextResponse.json({ success: false, message: "Failed to load stats." }, { status: 500 });
  }
}
