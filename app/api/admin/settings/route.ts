import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connectDB";
import { getOrCreateSettings, Settings } from "@/models/Settings";

export async function GET() {
  try {
    await connectDB();
    const settings = await getOrCreateSettings();
    return NextResponse.json({ success: true, settings });
  } catch (err) {
    console.error("[admin/settings] GET error:", err);
    return NextResponse.json({ success: false, message: "Failed to load settings." }, { status: 500 });
  }
}

const EDITABLE_FIELDS = [
  "companyName",
  "supportEmail",
  "supportPhone",
  "whatsappNumber",
  "officeAddress",
  "defaultTheme",
  "msg91ApiKey",
  "twilioAccountSid",
  "twilioAuthToken",
  "smtpHost",
  "smtpUser",
  "smtpPass",
] as const;

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const update: Record<string, unknown> = {};
    for (const field of EDITABLE_FIELDS) {
      if (field in body) update[field] = body[field];
    }

    const existing = await getOrCreateSettings();
    const settings = await Settings.findByIdAndUpdate(existing._id, update, { new: true });

    return NextResponse.json({ success: true, settings });
  } catch (err) {
    console.error("[admin/settings] PUT error:", err);
    return NextResponse.json({ success: false, message: "Failed to update settings." }, { status: 500 });
  }
}
