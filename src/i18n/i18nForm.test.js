import { describe, expect, test } from "vitest";
import { i18nFormError } from "./i18nForm";
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
