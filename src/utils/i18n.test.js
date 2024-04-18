import { describe, expect, it } from "vitest";
import { i18nDate } from "./i18n";

describe("Validate i18nDate", () => {
  it("should return a date in french format", () => {
    const date = new Date("2021-08-01T00:00:00.000Z");
    const result = i18nDate(date);
    expect(result).toBe("1 août 2021");
  });
});
