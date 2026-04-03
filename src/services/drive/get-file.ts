import type { createRequest } from "../../requests.js";
import type { DriveItem } from "../../types.js";

export function createGetFile(request: ReturnType<typeof createRequest>) {
  return async function getFile({ fileId }: { fileId: string }) {
    return request<DriveItem>(`/drive/files/${fileId}`, {
      method: "GET",
    });
  };
}
