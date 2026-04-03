import type { createRequest } from "../../requests.js";
import { createCreateFolder } from "./create-folder.js";
import { createDownloadFile } from "./download-file.js";
import { createFinalizeUpload } from "./finalize-upload.js";
import { createGetDriveTree } from "./get-drive-tree.js";
import { createGetFile } from "./get-file.js";
import { createGetPresignedUrls } from "./get-presigned-urls.js";
import { createSearchDrive } from "./search-drive.js";
import { createStartUpload } from "./start-upload.js";

export function createDriveHandlers(request: ReturnType<typeof createRequest>) {
  return {
    getDriveTree: createGetDriveTree(request),
    searchDrive: createSearchDrive(request),
    getFile: createGetFile(request),
    downloadFile: createDownloadFile(request),
    createFolder: createCreateFolder(request),
    startUpload: createStartUpload(request),
    getPresignedUrls: createGetPresignedUrls(request),
    finalizeUpload: createFinalizeUpload(request),
  };
}
