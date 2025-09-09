import request from "supertest";
import express from "express";
import userSettingsRouter from "./userSettings.routes";
import { userSettingsStore } from "./userSettings.controller";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  (req as any).user = { id: "user1", email: "test@example.com" };
  next();
});

app.use(userSettingsRouter);

describe("User Settings API", () => {
  beforeEach(() => {
    userSettingsStore.clear();
  });

  test("GET /user/settings - not found", async () => {
    const res = await request(app).get("/user/settings");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Settings not found");
  });

  test("PATCH /user/settings - valid update", async () => {
    const payload = {
      language: "cs",
      emailNotifications: true,
      backupPhone: "+420777111789",
    };

    const patchRes = await request(app)
      .patch("/user/settings")
      .send(payload);

    expect(patchRes.statusCode).toBe(200);
    expect(patchRes.body.data).toEqual(payload);

    const getRes = await request(app).get("/user/settings");
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body.data).toEqual(payload);
  });

  test("PATCH /user/settings - invalid payload wihout language", async () => {
    const payload = {
      emailNotifications: true,
    };

    const res = await request(app)
      .patch("/user/settings")
      .send(payload);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid settings format");
  });

  test("PATCH /user/settings - invalid payload with unsupported language", async () => {
    const payload = {
      language: "fr",
      emailNotifications: true,
    };

    const res = await request(app)
      .patch("/user/settings")
      .send(payload);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid settings format");
  });

  test("GET /user/settings - unauthorized", async () => {
    const appNoAuth = express();
    appNoAuth.use(express.json());
    appNoAuth.use(userSettingsRouter);

    const res = await request(appNoAuth).get("/user/settings");
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe("Unauthorized");
  });
});
