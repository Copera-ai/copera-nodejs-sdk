import type { createRequest } from "../../requests.js";
import type { Board } from "../../types.js";

export function createListBoards(request: ReturnType<typeof createRequest>) {
  return async function listBoards() {
    return request<Board[]>("/board/list-boards", {
      method: "GET",
    });
  };
}
