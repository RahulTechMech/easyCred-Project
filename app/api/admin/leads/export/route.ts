import { NextResponse } from "next/server";
import fs from "fs/promises";
import { getExcelExportFilePath } from "@/lib/excel/appendLeadToExcel";
import { generateFreshExcel } from "@/lib/excel/generateFreshExcel";

// GET → download the current leads workbook (already protected by
// middleware.ts, which requires a valid admin session for all /api/admin/*
// routes except /api/admin/login).
export async function GET() {
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
    return NextResponse.json({ success: false, message: "No leads have been submitted yet." }, { status: 404 });
  }
}

// POST → rebuild the workbook from scratch from every application in MongoDB.
export async function POST() {
  try {
    const { rowCount } = await generateFreshExcel();
    return NextResponse.json({ success: true, rowCount });
  } catch (err) {
    console.error("[admin/leads/export] Failed to regenerate Excel:", err);
    return NextResponse.json({ success: false, message: "Failed to regenerate the Excel file." }, { status: 500 });
  }
}
