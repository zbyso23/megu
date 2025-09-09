import { UserSettingsInput } from "./userSettings.types";

export function isValidSettings(input: unknown): input is UserSettingsInput {
  if (
    typeof input === "object" &&
    input !== null &&
    "language" in input &&
    "emailNotifications" in input
  ) {
    const i = input as Record<string, unknown>;
    const validLang = ["cs", "en", "de"].includes(String(i.language));
    const validNotif = typeof i.emailNotifications === "boolean";
    const validPhone =
      i.backupPhone === undefined || typeof i.backupPhone === "string";

    return validLang && validNotif && validPhone;
  }
  return false;
}