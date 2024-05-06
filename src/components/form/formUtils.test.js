import { errorMessage } from "./formUtils";

import { describe, it, expect } from "vitest";

describe("Valide errorMessage function", () => {
  it("Should return the error message when error.message is not null", () => {
    const error = { message: "This field is required" };
    expect(errorMessage(error)).toBe("This field is required");
  });

  it("should return 'This field is required' when error.type is 'required'", () => {
    const error = { type: "required" };
    expect(errorMessage(error)).toBe("This field is required");
  });
});
