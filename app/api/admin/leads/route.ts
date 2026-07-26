import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connectDB";
import { LoanApplication } from "@/models/LoanApplication";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const params = req.nextUrl.searchParams;

    const search = params.get("search")?.trim();
    const status = params.get("status");
    const city = params.get("city");
    const employmentType = params.get("employmentType");
    const minAmount = params.get("minAmount");
    const maxAmount = params.get("maxAmount");
    const dateFrom = params.get("dateFrom");
    const dateTo = params.get("dateTo");
    const sortBy = params.get("sortBy") || "createdAt";
    const sortDir = params.get("sortDir") === "asc" ? 1 : -1;
    const page = Math.max(1, Number(params.get("page")) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(params.get("pageSize")) || 20));

    const query: Record<string, unknown> = {};

    if (search) {
      const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      query.$or = [
        { leadId: regex },
        { "personal.fullName": regex },
        { "personal.mobileNumber": regex },
        { "personal.email": regex },
      ];
    }
    if (status) query.status = status;
    if (city) query["personal.city"] = new RegExp(`^${city}$`, "i");
    if (employmentType) query["employment.employmentType"] = employmentType;
    if (minAmount || maxAmount) {
      query["loan.requiredLoanAmount"] = {
        ...(minAmount ? { $gte: Number(minAmount) } : {}),
        ...(maxAmount ? { $lte: Number(maxAmount) } : {}),
      };
    }
    if (dateFrom || dateTo) {
      query.createdAt = {
        ...(dateFrom ? { $gte: new Date(dateFrom) } : {}),
        ...(dateTo ? { $lte: new Date(new Date(dateTo).getTime() + 24 * 60 * 60 * 1000) } : {}),
      };
    }

    const sortField =
      {
        name: "personal.fullName",
        loanAmount: "loan.requiredLoanAmount",
        readiness: "loanReadinessScore",
        createdAt: "createdAt",
        status: "status",
      }[sortBy] || "createdAt";

    const [leads, total] = await Promise.all([
      LoanApplication.find(query)
        .sort({ [sortField]: sortDir })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .select(
          "leadId personal.fullName personal.mobileNumber personal.email personal.city loan.requiredLoanAmount employment.employmentType loanReadinessScore status assignedEmployee createdAt"
        )
        .lean(),
      LoanApplication.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      leads,
      pagination: { page, pageSize, total, totalPages: Math.max(1, Math.ceil(total / pageSize)) },
    });
  } catch (err) {
    console.error("[admin/leads] GET error:", err);
    return NextResponse.json({ success: false, message: "Failed to load leads." }, { status: 500 });
  }
}
