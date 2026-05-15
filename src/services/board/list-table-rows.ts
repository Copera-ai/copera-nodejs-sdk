import type { createRequest } from "../../requests.js";
import type { ListTableRowsParams, Row } from "../../types.js";

function buildQuery(params: Pick<ListTableRowsParams, "filter" | "sort">) {
  const search = new URLSearchParams();
  if (params.filter) {
    search.set("filter", JSON.stringify(params.filter));
  }
  if (params.sort?.length) {
    search.set(
      "sort",
      params.sort.map((s) => `${s.column}:${s.dir}`).join(","),
    );
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export function createListTableRows(request: ReturnType<typeof createRequest>) {
  return async function listTableRows({
    boardId,
    tableId,
    filter,
    sort,
  }: ListTableRowsParams) {
    const qs = buildQuery({ filter, sort });
    return request<Row[]>(`/board/${boardId}/table/${tableId}/rows${qs}`, {
      method: "GET",
    });
  };
}
