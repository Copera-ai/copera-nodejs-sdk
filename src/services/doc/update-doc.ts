import type { createRequest } from "../../requests.js";
import type { Doc, UpdateDocParams } from "../../types.js";

export function createUpdateDoc(request: ReturnType<typeof createRequest>) {
  return async function updateDoc({
    docId,
    title,
    icon,
    cover,
  }: UpdateDocParams) {
    return request<Doc>(`/docs/${docId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        icon,
        cover,
      }),
    });
  };
}
