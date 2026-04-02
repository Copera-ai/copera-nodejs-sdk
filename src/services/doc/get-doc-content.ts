import type { createRequest } from "../../requests.js";
import type { DocContent } from "../../types.js";

export function createGetDocContent(request: ReturnType<typeof createRequest>) {
  return async function getDocContent({ docId }: { docId: string }) {
    return request<DocContent>(`/docs/${docId}/md`, {
      method: "GET",
    });
  };
}
