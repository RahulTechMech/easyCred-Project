import type { EmailMessage, EmailService } from "./types";

/**
 * Development-only mock. Logs the email instead of sending it. Swap for a
 * NodemailerEmailService (implementing the same EmailService interface)
 * once SMTP_* env vars are configured — see .env.example.
 */
export class MockEmailService implements EmailService {
  async send(message: EmailMessage) {
    console.info(`[MockEmailService] Would send email to ${message.to}: "${message.subject}"`);
    return { success: true };
  }
}

// -----------------------------------------------------------------------
// Example of how Nodemailer would be wired in later:
//
// import nodemailer from "nodemailer";
//
// export class NodemailerEmailService implements EmailService {
//   private transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
//   });
//
//   async send(message: EmailMessage) {
//     await this.transporter.sendMail({
//       from: process.env.EMAIL_FROM,
//       to: message.to,
//       subject: message.subject,
//       html: message.html,
//     });
//     return { success: true };
//   }
// }
// -----------------------------------------------------------------------

export const emailService: EmailService = new MockEmailService();

export function applicationReceivedEmail(applicantName: string, leadId: string): EmailMessage {
  return {
    to: "", // filled in by caller
    subject: "We've received your EasyCred loan application",
    html: `<p>Hi ${applicantName},</p><p>Thanks for applying with EasyCred. Your reference ID is <strong>${leadId}</strong>. One of our loan advisors will call you shortly.</p>`,
  };
}

export function adminNewLeadEmail(leadId: string, applicantName: string, mobileNumber: string): EmailMessage {
  return {
    to: process.env.ADMIN_NOTIFY_EMAIL || "",
    subject: `New lead: ${applicantName} (${leadId})`,
    html: `<p>New loan application received.</p><p>Lead ID: ${leadId}<br/>Name: ${applicantName}<br/>Mobile: ${mobileNumber}</p>`,
  };
}
