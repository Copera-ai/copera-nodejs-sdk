import type { createRequest } from "../../requests.js";
import type { SendMessageParams } from "../../types.js";

export function createSendMessage(request: ReturnType<typeof createRequest>) {
  return async function sendMessage({
    channelId,
    message,
    name,
  }: SendMessageParams) {
    return request<void>(`/chat/channel/${channelId}/send-message`, {
      method: "POST",
      body: JSON.stringify({
        message,
        name,
      }),
    });
  };
}
