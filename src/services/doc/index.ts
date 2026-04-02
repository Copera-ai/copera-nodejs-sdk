import type { createRequest } from "../../requests.js";
import { createCreateDoc } from "./create-doc.js";
import { createDeleteDoc } from "./delete-doc.js";
import { createGetDocContent } from "./get-doc-content.js";
import { createGetDocDetails } from "./get-doc-details.js";
import { createGetDocTree } from "./get-doc-tree.js";
import { createSearchDocs } from "./search-docs.js";
import { createUpdateDoc } from "./update-doc.js";
import { createUpdateDocContent } from "./update-doc-content.js";

export function createDocHandlers(request: ReturnType<typeof createRequest>) {
  return {
    createDoc: createCreateDoc(request),
    getDocDetails: createGetDocDetails(request),
    getDocContent: createGetDocContent(request),
    updateDoc: createUpdateDoc(request),
    updateDocContent: createUpdateDocContent(request),
    deleteDoc: createDeleteDoc(request),
    searchDocs: createSearchDocs(request),
    getDocTree: createGetDocTree(request),
  };
}
