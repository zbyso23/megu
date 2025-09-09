import { RequestHandler, Response } from "express";
import {
  UserSettingsInput,
  UserSettingsOutput,
} from "./userSettings.types";
import { Request } from "express";
import { isValidSettings } from "./userSettings.utils";

const userSettingsStore = new Map<string, UserSettingsOutput>();

type AuthenticatedRequest = Request<{}, {}, UserSettingsInput> & {
  user: {
    id: string;
    role?: string;
    email?: string;
  };
}

export const getUserSettings: RequestHandler = (req, res) => {
  const { user } = req as AuthenticatedRequest;

  if (!user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const settings = userSettingsStore.get(user.id);
  if (!settings) {
    return res.status(404).json({ error: "Settings not found" });
  }
  return res.status(200).json({ status: "ok", data: settings });
};

export const updateUserSettings: RequestHandler = (req, res) => {
  const { user, body } = req as AuthenticatedRequest;

  if (!user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!isValidSettings(body)) {
    return res.status(400).json({ error: "Invalid settings format" });
  }

  const newSettings: UserSettingsOutput = {
    language: body.language,
    emailNotifications: body.emailNotifications,
    backupPhone: body.backupPhone,
  };

  userSettingsStore.set(user.id, newSettings);

  return res.status(200).json({ status: "ok", data: newSettings });
}

export { userSettingsStore };