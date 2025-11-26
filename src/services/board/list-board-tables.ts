import type { createRequest } from "../../requests.js";
import type { Table } from "../../types.js";

export function createListBoardTables(
  request: ReturnType<typeof createRequest>,
) {
  return async function listBoardTables({ boardId }: { boardId: string }) {
    return request<Table[]>(`/board/${boardId}/tables`, {
      method: "GET",
    });
  };
}
