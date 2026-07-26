import ExcelJS from "exceljs";
import fs from "fs/promises";
import { LoanApplication } from "@/models/LoanApplication";
import { connectDB } from "@/lib/db/connectDB";
import { COLUMN_DEFS, getExportPath } from "./appendLeadToExcel";

/**
 * Rebuilds the entire leads workbook from MongoDB rather than incrementally
 * appending. Useful if the live file was deleted, corrupted, or has drifted
 * from the database (e.g. after bulk status updates in the CRM), and as the
 * "Generate Fresh Excel" action on the admin Settings page.
 */
export async function generateFreshExcel(): Promise<{ rowCount: number }> {
  await connectDB();
  const { dir, filePath } = getExportPath();
  await fs.mkdir(dir, { recursive: true });

  const applications = await LoanApplication.find().sort({ createdAt: 1 }).lean();

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Leads");
  sheet.columns = COLUMN_DEFS;
  sheet.getRow(1).font = { bold: true };
  sheet.getRow(1).eachCell((cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF11172A" } };
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
  });
  sheet.views = [{ state: "frozen", ySplit: 1 }];

  for (const app of applications) {
    sheet.addRow({
      leadId: app.leadId,
      fullName: app.personal.fullName,
      mobileNumber: app.personal.mobileNumber,
      city: app.personal.city,
      employmentType: app.employment.employmentType,
      loanAmount: app.loan.requiredLoanAmount,
      submissionDate: new Date(app.submittedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
      leadStatus: app.status,
    });
  }

  await workbook.xlsx.writeFile(filePath);
  return { rowCount: applications.length };
}
