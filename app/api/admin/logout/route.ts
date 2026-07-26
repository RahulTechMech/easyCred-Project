import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/auth/adminAuth";

export async function POST() {
  await adminAuth.logout();
  return NextResponse.json({ success: true });
}
