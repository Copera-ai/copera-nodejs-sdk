import type { createRequest } from "../../requests.js";
import type {
  DocContentUpdateResult,
  UpdateDocContentParams,
} from "../../types.js";

export function createUpdateDocContent(
  request: ReturnType<typeof createRequest>,
) {
  return async function updateDocContent({
    docId,
    operation,
    content,
  }: UpdateDocContentParams) {
    return request<DocContentUpdateResult>(`/docs/${docId}/md`, {
      method: "POST",
      body: JSON.stringify({
        operation,
        content,
      }),
    });
  };
}
