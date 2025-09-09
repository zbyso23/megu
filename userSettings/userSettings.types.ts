export type SupportedLanguage = "cs" | "en" | "de";

export interface UserSettingsInput {
  language: SupportedLanguage;
  emailNotifications: boolean;
  backupPhone?: string;
}

export interface UserSettingsOutput extends UserSettingsInput {}
