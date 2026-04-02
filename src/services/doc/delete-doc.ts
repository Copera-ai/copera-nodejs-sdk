import type { createRequest } from "../../requests.js";
import type { DocDeleteResult } from "../../types.js";

export function createDeleteDoc(request: ReturnType<typeof createRequest>) {
  return async function deleteDoc({ docId }: { docId: string }) {
    return request<DocDeleteResult>(`/docs/${docId}`, {
      method: "DELETE",
      body: JSON.stringify({}),
    });
  };
}
