import type { createRequest } from "../../requests.js";
import type { Board } from "../../types.js";

export function createGetBoardDetails(
  request: ReturnType<typeof createRequest>,
) {
  return async function getBoardDetails({ boardId }: { boardId: string }) {
    return request<Board>(`/board/${boardId}`, {
      method: "GET",
    });
  };
}
