import { CoperaAIError } from "./exceptions.js";
import { createRequest } from "./requests.js";
import { getHandlers } from "./services/index.js";

interface CoperaAIOptions {
  apiKey: string;
  sandbox?: boolean;
}
export function CoperaAI({ apiKey, sandbox = false }: CoperaAIOptions) {
  if (!apiKey) throw new CoperaAIError("API key is required!");
  const request = createRequest(apiKey, sandbox);

  return getHandlers(request);
}

export { CoperaAIError };

export * from "./types.js";

export default CoperaAI;
