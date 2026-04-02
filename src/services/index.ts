import type { createRequest } from "../requests.js";
import { createBoardHandlers } from "./board/index.js";
import { createChannelHandlers } from "./channel/index.js";
import { createDocHandlers } from "./doc/index.js";

export function getHandlers(request: ReturnType<typeof createRequest>) {
  return {
    board: createBoardHandlers(request),
    channel: createChannelHandlers(request),
    doc: createDocHandlers(request),
  };
}
