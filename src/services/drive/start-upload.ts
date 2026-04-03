import type { createRequest } from "../../requests.js";
import type { DriveUploadStartResult, StartUploadParams } from "../../types.js";

export function createStartUpload(request: ReturnType<typeof createRequest>) {
  return async function startUpload({
    fileName,
    fileSize,
    mimeType,
    parentId,
  }: StartUploadParams) {
    return request<DriveUploadStartResult>(
      "/drive/files/upload/multipart/start",
      {
        method: "POST",
        body: JSON.stringify({
          fileName,
          fileSize,
          mimeType,
          parentId,
        }),
      },
    );
  };
}
