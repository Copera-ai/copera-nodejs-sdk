import type { createRequest } from "../../requests.js";
import type { ColumnValue, Row } from "../../types.js";

export function createCreateTableRow(
  request: ReturnType<typeof createRequest>,
) {
  return async function createTableRow({
    boardId,
    tableId,
    description,
    columns,
  }: {
    boardId: string;
    tableId: string;
    description?: string;
    columns: ColumnValue[];
  }) {
    return request<Row>(`/board/${boardId}/table/${tableId}/row`, {
      method: "POST",
      body: JSON.stringify({
        description,
        columns,
      }),
    });
  };
}
