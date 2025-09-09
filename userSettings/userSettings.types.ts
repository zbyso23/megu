import { Request } from "express";

export type SupportedLanguage = "cs" | "en" | "de";

export interface UserSettingsInput {
  language: SupportedLanguage;
  emailNotifications: boolean;
  backupPhone?: string;
}

export interface UserSettingsOutput extends UserSettingsInput {}

export type AuthenticatedRequest = Request<{}, {}, UserSettingsInput> & {
  user: {
    id: string;
    role?: string;
    email?: string;
  };
}
