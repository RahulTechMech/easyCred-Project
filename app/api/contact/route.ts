import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connectDB";
import { ContactMessage } from "@/models/ContactMessage";
import { contactMessageSchema } from "@/lib/validation/contactSchema";
import { emailService } from "@/lib/services/email";

const submissionLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 8;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ success: false, message: "Too many messages. Please try again later." }, { status: 429 });
    }

    const body = await req.json();

    // Honeypot — hidden field named "website" that real users never fill.
    if (body.website) {
      return NextResponse.json({ success: false, message: "Submission rejected." }, { status: 400 });
    }

    const parsed = contactMessageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: "Validation failed", errors: parsed.error.flatten() }, { status: 422 });
    }

    await connectDB();
    await ContactMessage.create(parsed.data);

    try {
      await emailService.send({
        to: process.env.ADMIN_NOTIFY_EMAIL || "",
        subject: `New contact message: ${parsed.data.subject}`,
        html: `<p>From: ${parsed.data.name} (${parsed.data.email}, ${parsed.data.phone})</p><p>${parsed.data.message}</p>`,
      });
    } catch (emailErr) {
      console.error("[contact] Failed to send notification email:", emailErr);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[contact] Submission error:", err);
    return NextResponse.json({ success: false, message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
