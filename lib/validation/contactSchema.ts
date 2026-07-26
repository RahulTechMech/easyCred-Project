import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  subject: z.string().trim().min(3, "Enter a subject"),
  message: z.string().trim().min(10, "Message should be at least 10 characters"),
});

export type ContactMessageValues = z.infer<typeof contactMessageSchema>;
