import type { createRequest } from "../../requests.js";
import type { CreateRowCommentParams, RowComment } from "../../types.js";

export function createCreateRowComment(
  request: ReturnType<typeof createRequest>,
) {
  return async function createRowComment({
    boardId,
    tableId,
    rowId,
    content,
    visibility,
  }: CreateRowCommentParams) {
    return request<RowComment>(
      `/board/${boardId}/table/${tableId}/row/${rowId}/comment`,
      {
        method: "POST",
        body: JSON.stringify({
          content,
          visibility,
        }),
      },
    );
  };
}
