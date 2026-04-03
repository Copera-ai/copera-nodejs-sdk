import type { createRequest } from "../../requests.js";
import type { DriveItem, FinalizeUploadParams } from "../../types.js";

export function createFinalizeUpload(
  request: ReturnType<typeof createRequest>,
) {
  return async function finalizeUpload({
    uploadId,
    fileKey,
    parts,
  }: FinalizeUploadParams) {
    return request<DriveItem>("/drive/files/upload/multipart/finalize", {
      method: "POST",
      body: JSON.stringify({
        uploadId,
        fileKey,
        parts,
      }),
    });
  };
}
