import { describe, expect, it } from "vitest";
import { i18nRelativeDate } from "./i18nTime";

describe("i18nRelativeDate", () => {
  it("should return relative time", async () => {
    // Test cases

    expect(i18nRelativeDate(new Date())).toBe("0 seconds");
    expect(i18nRelativeDate(new Date(Date.now() - 1000))).toBe("1 second");
    expect(i18nRelativeDate(new Date(Date.now() - 1000 * 60))).toBe("1 minute");
    expect(i18nRelativeDate(new Date(Date.now() - 1000 * 60 * 60))).toBe(
      "1 hour"
    );
    expect(i18nRelativeDate(new Date(Date.now() - 1000 * 60 * 60 * 24))).toBe(
      "1 day"
    );
    expect(
      i18nRelativeDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 7))
    ).toBe("1 week");
    expect(
      i18nRelativeDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * 30))
    ).toBe("1 month");
  });
});
