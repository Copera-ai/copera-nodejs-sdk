import type { createRequest } from "../../requests.js";
import type {
  DriveUploadPresignedUrlsResult,
  GetPresignedUrlsParams,
} from "../../types.js";

export function createGetPresignedUrls(
  request: ReturnType<typeof createRequest>,
) {
  return async function getPresignedUrls({
    uploadId,
    fileKey,
    parts,
  }: GetPresignedUrlsParams) {
    return request<DriveUploadPresignedUrlsResult>(
      "/drive/files/upload/multipart/presigned-urls",
      {
        method: "POST",
        body: JSON.stringify({
          uploadId,
          fileKey,
          parts,
        }),
      },
    );
  };
}
