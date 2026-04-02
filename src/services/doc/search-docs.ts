import type { createRequest } from "../../requests.js";
import type { DocSearchResult, SearchDocsParams } from "../../types.js";

export function createSearchDocs(request: ReturnType<typeof createRequest>) {
  return async function searchDocs({
    q,
    sortBy,
    sortOrder,
    limit,
  }: SearchDocsParams) {
    const params = new URLSearchParams();
    params.set("q", q);
    if (sortBy !== undefined) params.set("sortBy", sortBy);
    if (sortOrder !== undefined) params.set("sortOrder", sortOrder);
    if (limit !== undefined) params.set("limit", limit.toString());
    const query = params.toString();
    const path = `/docs/search${query ? `?${query}` : ""}`;
    return request<DocSearchResult>(path, {
      method: "GET",
    });
  };
}
