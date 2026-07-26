import mongoose, { Schema, model, models, type Document } from "mongoose";

export interface ISettings extends Document {
  companyName: string;
  supportEmail: string;
  supportPhone: string;
  whatsappNumber: string;
  officeAddress: string;
  defaultTheme: "dark" | "light";
  // API key placeholders for future integrations — stored as provided,
  // masked in the UI. Wiring these up means implementing the matching
  // service in lib/services/{otp,email}/ against the existing interfaces.
  msg91ApiKey?: string;
  twilioAccountSid?: string;
  twilioAuthToken?: string;
  smtpHost?: string;
  smtpUser?: string;
  smtpPass?: string;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    companyName: { type: String, default: "EasyCred" },
    supportEmail: { type: String, default: "support@easycred.example" },
    supportPhone: { type: String, default: "+91 12345 67890" },
    whatsappNumber: { type: String, default: "911234567890" },
    officeAddress: {
      type: String,
      default: "4th Floor, Prestige Business Park, Bengaluru, Karnataka 560001",
    },
    defaultTheme: { type: String, enum: ["dark", "light"], default: "dark" },
    msg91ApiKey: String,
    twilioAccountSid: String,
    twilioAuthToken: String,
    smtpHost: String,
    smtpUser: String,
    smtpPass: String,
  },
  { timestamps: true }
);

export const Settings =
  (models.Settings as mongoose.Model<ISettings>) || model<ISettings>("Settings", SettingsSchema);

/** Settings is a singleton collection — always reads/creates the one document. */
export async function getOrCreateSettings() {
  let doc = await Settings.findOne();
  if (!doc) {
    doc = await Settings.create({});
  }
  return doc;
}
