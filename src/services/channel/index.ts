import type { createRequest } from "../../requests.js";
import { createSendMessage } from "./send-message.js";

export function createChannelHandlers(
  request: ReturnType<typeof createRequest>,
) {
  return {
    sendMessage: createSendMessage(request),
  };
}
