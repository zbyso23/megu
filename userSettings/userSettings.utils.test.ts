import { isValidSettings } from "./userSettings.utils";

describe("isValidSettings", () => {
  it("returns true for valid input", () => {
    const input = {
      language: "cs",
      emailNotifications: true,
      backupPhone: "+420777123456",
    };

    expect(isValidSettings(input)).toBe(true);
  });

  it("returns false for invalid language", () => {
    const input = {
      language: "fr",
      emailNotifications: true,
    };

    expect(isValidSettings(input)).toBe(false);
  });

  it("returns false for missing emailNotifications", () => {
    const input = {
      language: "en",
    };

    expect(isValidSettings(input)).toBe(false);
  });

  it("returns false for invalid backupPhone type", () => {
    const input = {
      language: "en",
      emailNotifications: true,
      backupPhone: 12345,
    };

    expect(isValidSettings(input)).toBe(false);
  });
});