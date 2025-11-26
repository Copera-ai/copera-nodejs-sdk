import type { createRequest } from "../../requests.js";
import type { Row } from "../../types.js";

export function createListTableRows(request: ReturnType<typeof createRequest>) {
  return async function listTableRows({
    boardId,
    tableId,
  }: {
    boardId: string;
    tableId: string;
  }) {
    return request<Row[]>(`/board/${boardId}/table/${tableId}/rows`, {
      method: "GET",
    });
  };
}
