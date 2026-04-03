import type { createRequest } from "../../requests.js";
import type { DriveDownloadResult } from "../../types.js";

export function createDownloadFile(request: ReturnType<typeof createRequest>) {
  return async function downloadFile({ fileId }: { fileId: string }) {
    return request<DriveDownloadResult>(`/drive/files/${fileId}/download`, {
      method: "GET",
    });
  };
}
