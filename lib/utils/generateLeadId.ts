/**
 * Generates a human-friendly, sortable lead ID like: EC-20260721-4F2A
 * EC          = EasyCred prefix
 * 20260721    = submission date (YYYYMMDD), makes IDs sortable and dated
 * 4F2A        = 4-character random suffix, keeps IDs short but collision-safe
 */
export function generateLeadId(): string {
  const now = new Date();
  const datePart = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");

  const randomPart = Math.random().toString(16).slice(2, 6).toUpperCase();

  return `EC-${datePart}-${randomPart}`;
}
