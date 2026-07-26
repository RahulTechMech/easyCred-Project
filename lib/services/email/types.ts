export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
}

export interface EmailService {
  send(message: EmailMessage): Promise<{ success: boolean; message?: string }>;
}
