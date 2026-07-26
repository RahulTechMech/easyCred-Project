import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connectDB";
import { LoanApplication } from "@/models/LoanApplication";
import { adminAuth } from "@/lib/auth/adminAuth";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const session = await adminAuth.getSession();
    const author = session?.email || "admin";

    const body = await req.json();
    const text = typeof body.text === "string" ? body.text.trim() : "";
    if (!text) {
      return NextResponse.json({ success: false, message: "Note text is required." }, { status: 400 });
    }

    const lead = await LoanApplication.findById(params.id);
    if (!lead) {
      return NextResponse.json({ success: false, message: "Lead not found." }, { status: 404 });
    }

    const now = new Date();
    lead.notes.push({ text, author, createdAt: now } as any);
    lead.timeline.push({
      type: "note",
      description: `Note added: "${text.length > 80 ? text.slice(0, 80) + "…" : text}"`,
      author,
      createdAt: now,
    } as any);

    await lead.save();

    return NextResponse.json({ success: true, lead });
  } catch (err) {
    console.error("[admin/leads/:id/notes] POST error:", err);
    return NextResponse.json({ success: false, message: "Failed to add note." }, { status: 500 });
  }
}
