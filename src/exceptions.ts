import { COPERA_DOCS } from "./constants.js";

/**
 * Default class for CoperaAI exceptions and errors.
 *
 * It can be serialized to JSON through the `toJSON` method.
 */
export class CoperaAIError extends Error {
  constructor(message: string) {
    super(
      `CoperaAI SDK Error: ${message}\n\nPlease, refer to the documentation at: ${COPERA_DOCS}`,
    );
    this.name = "CoperaAIError";
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
    };
  }
}
