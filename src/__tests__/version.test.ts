import { describe, expect, it } from "vitest";

import { COPERA_SDK_VERSION } from "../version.js";

describe("Version", () => {
  it("should export a valid version string", () => {
    expect(COPERA_SDK_VERSION).toBeDefined();
    expect(typeof COPERA_SDK_VERSION).toBe("string");
    expect(COPERA_SDK_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
