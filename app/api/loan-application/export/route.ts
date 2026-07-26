import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import { getExcelExportFilePath } from "@/lib/excel/appendLeadToExcel";

/**
 * GET /api/loan-application/export?key=YOUR_ADMIN_API_KEY
 *
 * Streams back the always-up-to-date leads spreadsheet so office staff
 * can download the latest version at any time (no manual export step).
 * Protected by a simple shared key — for real production admin tooling,
 * swap this for proper JWT-based admin auth.
 */
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");

  if (!process.env.ADMIN_API_KEY || key !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const filePath = getExcelExportFilePath();

  try {
    const fileBuffer = await fs.readFile(filePath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="easycred-leads.xlsx"',
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "No leads have been submitted yet." },
      { status: 404 }
    );
  }
}
