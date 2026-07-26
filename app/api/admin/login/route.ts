import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/auth/adminAuth";

// Basic in-memory rate limiting to slow down credential-guessing attempts.
const attemptLog = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (attemptLog.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  attemptLog.set(ip, timestamps);
  return timestamps.length > MAX_ATTEMPTS;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ success: false, message: "Too many attempts. Please try again later." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ success: false, message: "Email and password are required." }, { status: 400 });
  }

  const result = await adminAuth.login(email, password);
  if (!result.success) {
    return NextResponse.json(result, { status: 401 });
  }

  return NextResponse.json(result, { status: 200 });
}
