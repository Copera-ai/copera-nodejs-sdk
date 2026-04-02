import type { createRequest } from "../../requests.js";
import type { DocTreeResult, GetDocTreeParams } from "../../types.js";

export function createGetDocTree(request: ReturnType<typeof createRequest>) {
  return async function getDocTree({ parentId, depth }: GetDocTreeParams = {}) {
    const params = new URLSearchParams();
    if (parentId !== undefined) params.set("parentId", parentId);
    if (depth !== undefined) params.set("depth", depth.toString());
    const query = params.toString();
    const path = `/docs/tree${query ? `?${query}` : ""}`;
    return request<DocTreeResult>(path, {
      method: "GET",
    });
  };
}
