import ExcelJS from "exceljs";
import path from "path";
import fs from "fs/promises";
import type { ILoanApplication } from "@/models/LoanApplication";

const EXPORT_DIR = process.env.EXCEL_EXPORT_DIR || "data/exports";
const EXPORT_FILENAME = process.env.EXCEL_EXPORT_FILENAME || "easycred-leads.xlsx";

export const COLUMN_DEFS = [
  { header: "Lead ID", key: "leadId", width: 22 },
  { header: "Full Name", key: "fullName", width: 26 },
  { header: "Mobile Number", key: "mobileNumber", width: 16 },
  { header: "City", key: "city", width: 16 },
  { header: "Employment Type", key: "employmentType", width: 20 },
  { header: "Loan Amount (₹)", key: "loanAmount", width: 18 },
  { header: "Submission Date", key: "submissionDate", width: 22 },
  { header: "Lead Status", key: "leadStatus", width: 14 },
];

export function getExportPath(): { dir: string; filePath: string } {
  const dir = path.join(process.cwd(), EXPORT_DIR);
  const filePath = path.join(dir, EXPORT_FILENAME);
  return { dir, filePath };
}

async function loadOrCreateWorkbook(filePath: string): Promise<{ workbook: ExcelJS.Workbook; sheet: ExcelJS.Worksheet }> {
  const workbook = new ExcelJS.Workbook();

  const exists = await fs
    .access(filePath)
    .then(() => true)
    .catch(() => false);

  if (exists) {
    await workbook.xlsx.readFile(filePath);
    let sheet = workbook.getWorksheet("Leads");
    if (!sheet) {
      sheet = workbook.addWorksheet("Leads");
      sheet.columns = COLUMN_DEFS;
    }
    return { workbook, sheet };
  }

  const sheet = workbook.addWorksheet("Leads");
  sheet.columns = COLUMN_DEFS;
  sheet.getRow(1).font = { bold: true };
  sheet.getRow(1).eachCell((cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF11172A" } };
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
  });
  sheet.views = [{ state: "frozen", ySplit: 1 }];

  return { workbook, sheet };
}

/**
 * Appends one row to the shared "leads" Excel workbook so office staff can
 * open it immediately and start calling new applicants. This is intentionally
 * a SEPARATE, lightweight record from the full application stored in
 * MongoDB — it only contains what's needed for a follow-up call.
 *
 * NOTE: this uses simple read-modify-write of a local .xlsx file, which is
 * fine for a single-server deployment / low-to-medium lead volume. If you
 * scale to multiple server instances or very high submission volume, move
 * this to a queue + a single writer process (or generate the sheet on-demand
 * from MongoDB instead of maintaining a live file) to avoid write races.
 */
export async function appendLeadToExcel(application: ILoanApplication): Promise<void> {
  const { dir, filePath } = getExportPath();
  await fs.mkdir(dir, { recursive: true });

  const { workbook, sheet } = await loadOrCreateWorkbook(filePath);

  sheet.addRow({
    leadId: application.leadId,
    fullName: application.personal.fullName,
    mobileNumber: application.personal.mobileNumber,
    city: application.personal.city,
    employmentType: application.employment.employmentType,
    loanAmount: application.loan.requiredLoanAmount,
    submissionDate: new Date(application.submittedAt).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
    leadStatus: application.status,
  });

  await workbook.xlsx.writeFile(filePath);
}

export function getExcelExportFilePath(): string {
  return getExportPath().filePath;
}
