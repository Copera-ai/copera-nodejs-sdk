import type { createRequest } from "../../requests.js";
import type { DriveSearchResult, SearchDriveParams } from "../../types.js";

export function createSearchDrive(request: ReturnType<typeof createRequest>) {
  return async function searchDrive({
    q,
    sortBy,
    sortOrder,
    limit,
  }: SearchDriveParams) {
    const params = new URLSearchParams();
    params.set("q", q);
    if (sortBy !== undefined) params.set("sortBy", sortBy);
    if (sortOrder !== undefined) params.set("sortOrder", sortOrder);
    if (limit !== undefined) params.set("limit", limit.toString());
    const query = params.toString();
    const path = `/drive/search${query ? `?${query}` : ""}`;
    return request<DriveSearchResult>(path, {
      method: "GET",
    });
  };
}
