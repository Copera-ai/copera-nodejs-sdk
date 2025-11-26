import { COPERA_SDK_VERSION } from "./version.js";

export const BASE_URL = "https://api.copera.ai/public/v1";
export const BASE_URL_DEV = "https://api-dev.copera.ai/public/v1";

export const COPERA_DOCS = "https://developers.copera.ai";

export function getHeaders(apiKey: string) {
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "User-Agent": `NodeJS SDK ${COPERA_SDK_VERSION}`,
  };
}
