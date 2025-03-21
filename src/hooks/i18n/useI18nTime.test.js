import { describe, test, expect } from "vitest";

import { relativeTime, formatDate, formatDateTime } from "./useI18nTime";

describe("Should validate relative time", () => {
  test("Should return values in english", async () => {
    expect(relativeTime(new Date())).toBe("now");
    expect(relativeTime(new Date(Date.now() - 1000))).toBe("1 second ago");
    expect(relativeTime(new Date(Date.now() - 1000 * 60))).toBe("1 minute ago");
    expect(relativeTime(new Date(Date.now() - 1000 * 60 * 60))).toBe(
      "1 hour ago"
    );
    expect(relativeTime(new Date(Date.now() - 1000 * 60 * 60 * 24))).toBe(
      "yesterday"
    );
    expect(relativeTime(new Date(Date.now() - 1000 * 60 * 60 * 24 * 7))).toBe(
      "last week"
    );
    expect(relativeTime(new Date(Date.now() - 1000 * 60 * 60 * 24 * 30))).toBe(
      "last month"
    );
  });
  test("Should return values in french", async () => {
    expect(relativeTime(new Date(), "fr")).toBe("maintenant");
    expect(relativeTime(new Date(Date.now() - 1000), "fr")).toBe(
      "il y a 1 seconde"
    );
    expect(relativeTime(new Date(Date.now() - 1000 * 60), "fr")).toBe(
      "il y a 1 minute"
    );
    expect(relativeTime(new Date(Date.now() - 1000 * 60 * 60), "fr")).toBe(
      "il y a 1 heure"
    );
    expect(relativeTime(new Date(Date.now() - 1000 * 60 * 60 * 24), "fr")).toBe(
      "hier"
    );
    expect(
      relativeTime(new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), "fr")
    ).toBe("la semaine dernière");
    expect(
      relativeTime(new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), "fr")
    ).toBe("le mois dernier");
  });
});

describe("Should validate formatDate", () => {
  test("Should return values in english", async () => {
    expect(formatDate(new Date("2021-01-01T00:00:00.000Z"))).toBe(
      "January 1, 2021"
    );
  });

  test("Should return values in french", async () => {
    expect(formatDate(new Date("2021-01-01T00:00:00.000Z"), "fr")).toBe(
      "1 janvier 2021"
    );
  });
});

describe("Should validate formatDateTime", () => {
  test("Should return values in english", async () => {
    expect(formatDateTime(new Date("2021-01-01T00:00:00.000Z"))).toBe(
      "January 1, 2021 at 1:00 AM"
    );
  });

  test("Should return values in french", async () => {
    expect(formatDateTime(new Date("2021-01-01T00:00:00.000Z"), "fr")).toBe(
      "1 janvier 2021 à 01:00"
    );
  });
});
