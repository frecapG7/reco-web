import { describe, expect, it, test } from "vitest";
import { i18nDate, i18nFormError } from "./i18n";

describe("Validate i18nDate", () => {
  it("should return a date in french format", () => {
    const date = new Date("2021-08-01T00:00:00.000Z");
    const result = i18nDate(date);
    expect(result).toBe("1 août 2021");
  });
});

describe("Validate i18nFormError", () => {
  test("should return the error message", async () => {
    const error = { message: "This field is required" };
    const result = i18nFormError(error);
    expect(result).toBe("This field is required");
  });

  test("should return the required error message", async () => {
    const error = { type: "required" };
    const result = i18nFormError(error);
    expect(result).toBe("This field is required");
  });

  test("should return the minLength error message", async () => {
    const error = { type: "minLength" };
    const result = i18nFormError(error);
    expect(result).toBe("This field is too short");
  });
});
