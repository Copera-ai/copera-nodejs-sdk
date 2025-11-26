import { describe, expect, it } from "vitest";

import {
  BASE_URL,
  BASE_URL_DEV,
  COPERA_DOCS,
  getHeaders,
} from "../constants.js";
import { COPERA_SDK_VERSION } from "../version.js";

describe("Constants", () => {
  describe("BASE_URL", () => {
    it("should have correct API base URL", () => {
      expect(BASE_URL).toBe("https://api.copera.ai/public/v1");
    });
  });

  describe("BASE_URL_DEV", () => {
    it("should have correct API base URL for development", () => {
      expect(BASE_URL_DEV).toBe("https://api-dev.copera.ai/public/v1");
    });
  });

  describe("COPERA_DOCS", () => {
    it("should have correct documentation URL", () => {
      expect(COPERA_DOCS).toBe("https://developers.copera.ai");
    });
  });

  describe("getHeaders", () => {
    it("should return headers with Authorization, Content-Type and User-Agent", () => {
      const apiKey = "test-api-key";
      const headers = getHeaders(apiKey);

      expect(headers).toEqual({
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": `NodeJS SDK ${COPERA_SDK_VERSION}`,
      });
    });
  });
});
