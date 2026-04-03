import type { createRequest } from "../../requests.js";
import type { DriveTreeResult, GetDriveTreeParams } from "../../types.js";

export function createGetDriveTree(request: ReturnType<typeof createRequest>) {
  return async function getDriveTree({
    parentId,
    depth,
  }: GetDriveTreeParams = {}) {
    const params = new URLSearchParams();
    if (parentId !== undefined) params.set("parentId", parentId);
    if (depth !== undefined) params.set("depth", depth.toString());
    const query = params.toString();
    const path = `/drive/tree${query ? `?${query}` : ""}`;
    return request<DriveTreeResult>(path, {
      method: "GET",
    });
  };
}
