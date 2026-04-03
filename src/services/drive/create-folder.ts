import type { createRequest } from "../../requests.js";
import type { CreateFolderParams, DriveItem } from "../../types.js";

export function createCreateFolder(request: ReturnType<typeof createRequest>) {
  return async function createFolder({ name, parentId }: CreateFolderParams) {
    return request<DriveItem>("/drive/folders", {
      method: "POST",
      body: JSON.stringify({
        name,
        parentId,
      }),
    });
  };
}
