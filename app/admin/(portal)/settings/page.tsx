import type { Metadata } from "next";
import { SettingsForm } from "@/components/admin/settings/SettingsForm";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return <SettingsForm />;
}
