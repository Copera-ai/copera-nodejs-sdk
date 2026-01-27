import type { createRequest } from "../../requests.js";
import type { AuthenticateTableRowParams, Row } from "../../types.js";

export function createAuthenticateTableRow(
  request: ReturnType<typeof createRequest>,
) {
  return async function authenticateTableRow({
    boardId,
    tableId,
    identifierColumnId,
    identifierColumnValue,
    passwordColumnId,
    passwordColumnValue,
  }: AuthenticateTableRowParams) {
    return request<Row>(`/board/${boardId}/table/${tableId}/row/authenticate`, {
      method: "POST",
      body: JSON.stringify({
        identifierColumnId,
        identifierColumnValue,
        passwordColumnId,
        passwordColumnValue,
      }),
    });
  };
}
