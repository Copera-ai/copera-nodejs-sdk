import type { createRequest } from "../../requests.js";
import type {
  ListRowCommentsParams,
  RowCommentPagination,
} from "../../types.js";

export function createListRowComments(
  request: ReturnType<typeof createRequest>,
) {
  return async function listRowComments({
    boardId,
    tableId,
    rowId,
    visibility,
    after,
    before,
  }: ListRowCommentsParams) {
    const params = new URLSearchParams();
    if (visibility !== undefined) params.set("visibility", visibility);
    if (after !== undefined) params.set("after", after);
    if (before !== undefined) params.set("before", before);
    const query = params.toString();
    const path = `/board/${boardId}/table/${tableId}/row/${rowId}/comments${query ? `?${query}` : ""}`;
    return request<RowCommentPagination>(path, {
      method: "GET",
    });
  };
}
