import { Router } from "express";
import { getUserSettings, updateUserSettings } from "./userSettings.controller";

const router = Router();

router.patch("/user/settings", updateUserSettings);
router.get("/user/settings", getUserSettings);

export default router;
