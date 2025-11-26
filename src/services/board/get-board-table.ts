import type { createRequest } from "../../requests.js";
import type { Table } from "../../types.js";

export function createGetBoardTable(request: ReturnType<typeof createRequest>) {
  return async function getBoardTable({
    boardId,
    tableId,
  }: {
    boardId: string;
    tableId: string;
  }) {
    return request<Table>(`/board/${boardId}/table/${tableId}`, {
      method: "GET",
    });
  };
}
