import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connectDB";
import { LoanApplication } from "@/models/LoanApplication";
import { adminAuth } from "@/lib/auth/adminAuth";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const lead = await LoanApplication.findById(params.id).lean();
    if (!lead) {
      return NextResponse.json({ success: false, message: "Lead not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, lead });
  } catch (err) {
    console.error("[admin/leads/:id] GET error:", err);
    return NextResponse.json({ success: false, message: "Failed to load lead." }, { status: 500 });
  }
}

/**
 * Handles every CRM mutation on a lead — status changes, employee
 * assignment, follow-up scheduling, and call outcomes — through one PATCH
 * endpoint, each appending a matching entry to the lead's activity timeline
 * so every action is auditable from the lead detail page.
 */
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const session = await adminAuth.getSession();
    const author = session?.email || "admin";
    const body = await req.json();

    const lead = await LoanApplication.findById(params.id);
    if (!lead) {
      return NextResponse.json({ success: false, message: "Lead not found." }, { status: 404 });
    }

    const timelineEntries: { type: string; description: string; author: string; createdAt: Date }[] = [];
    const now = new Date();

    if (typeof body.status === "string" && body.status !== lead.status) {
      timelineEntries.push({
        type: "status_change",
        description: `Status changed from "${lead.status}" to "${body.status}"`,
        author,
        createdAt: now,
      });
      lead.status = body.status;
    }

    if ("assignedEmployee" in body && body.assignedEmployee !== lead.assignedEmployee) {
      timelineEntries.push({
        type: "assignment",
        description: body.assignedEmployee
          ? `Assigned to ${body.assignedEmployee}`
          : "Unassigned from employee",
        author,
        createdAt: now,
      });
      lead.assignedEmployee = body.assignedEmployee || undefined;
    }

    if (body.followUp && typeof body.followUp === "object") {
      const { date, time, completed } = body.followUp;
      const wasCompleted = lead.followUp?.completed;
      lead.followUp = {
        date: date ?? lead.followUp?.date,
        time: time ?? lead.followUp?.time,
        completed: completed ?? lead.followUp?.completed ?? false,
      };
      if (completed && !wasCompleted) {
        timelineEntries.push({ type: "follow_up", description: "Follow-up marked complete", author, createdAt: now });
      } else if (date || time) {
        timelineEntries.push({
          type: "follow_up",
          description: `Follow-up scheduled for ${date || lead.followUp.date || "TBD"}${time ? ` at ${time}` : ""}`,
          author,
          createdAt: now,
        });
      }
    }

    if (typeof body.callOutcome === "string" && body.callOutcome) {
      lead.callOutcome = body.callOutcome;
      lead.lastContactedAt = now;
      timelineEntries.push({
        type: "call_outcome",
        description: `Call logged — outcome: ${body.callOutcome}`,
        author,
        createdAt: now,
      });
    }

    if (typeof body.customerInterested === "boolean") {
      lead.customerInterested = body.customerInterested;
    }

    if (timelineEntries.length > 0) {
      lead.timeline.push(...(timelineEntries as any));
    }

    await lead.save();

    return NextResponse.json({ success: true, lead });
  } catch (err) {
    console.error("[admin/leads/:id] PATCH error:", err);
    return NextResponse.json({ success: false, message: "Failed to update lead." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const deleted = await LoanApplication.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Lead not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/leads/:id] DELETE error:", err);
    return NextResponse.json({ success: false, message: "Failed to delete lead." }, { status: 500 });
  }
}
