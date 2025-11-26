import type { createRequest } from "../../requests.js";
import type { Row } from "../../types.js";

export function createGetTableRow(request: ReturnType<typeof createRequest>) {
  return async function getTableRow({
    boardId,
    tableId,
    rowId,
  }: {
    boardId: string;
    tableId: string;
    rowId: string;
  }) {
    return request<Row>(`/board/${boardId}/table/${tableId}/row/${rowId}`, {
      method: "GET",
    });
  };
}
