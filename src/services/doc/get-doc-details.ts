import type { createRequest } from "../../requests.js";
import type { Doc } from "../../types.js";

export function createGetDocDetails(request: ReturnType<typeof createRequest>) {
  return async function getDocDetails({ docId }: { docId: string }) {
    return request<Doc>(`/docs/${docId}`, {
      method: "GET",
    });
  };
}
