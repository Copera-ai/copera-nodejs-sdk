import { describe, expect, it } from "vitest";

import { COPERA_DOCS } from "../constants.js";
import { CoperaAIError } from "../exceptions.js";

describe("CoperaAIError", () => {
  it("should create error with correct name", () => {
    const error = new CoperaAIError("Test error");
    expect(error.name).toBe("CoperaAIError");
  });

  it("should format message with documentation link", () => {
    const errorMessage = "Test error";
    const error = new CoperaAIError(errorMessage);
    expect(error.message).toBe(
      `CoperaAI SDK Error: ${errorMessage}\n\nPlease, refer to the documentation at: ${COPERA_DOCS}`,
    );
  });

  it("should be serializable to JSON", () => {
    const errorMessage = "Test error";
    const error = new CoperaAIError(errorMessage);
    const jsonError = error.toJSON();

    expect(jsonError).toEqual({
      name: "CoperaAIError",
      message: `CoperaAI SDK Error: ${errorMessage}\n\nPlease, refer to the documentation at: ${COPERA_DOCS}`,
    });
  });
});
