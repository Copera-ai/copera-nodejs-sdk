import type { createRequest } from "../../requests.js";
import type { CreateDocParams, Doc } from "../../types.js";

export function createCreateDoc(request: ReturnType<typeof createRequest>) {
  return async function createDoc({ title, parent, content }: CreateDocParams) {
    return request<Doc>("/docs/", {
      method: "POST",
      body: JSON.stringify({
        title,
        parent,
        content,
      }),
    });
  };
}
