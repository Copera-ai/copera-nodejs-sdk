import { BASE_URL, BASE_URL_DEV, getHeaders } from "./constants.js";

export function createRequest(
  apiKey: string,
  sandbox: boolean = false,
): <TResponse>(path: string, options: RequestInit) => Promise<TResponse> {
  const defaultHeaders = getHeaders(apiKey);

  const baseUrl = sandbox ? BASE_URL_DEV : BASE_URL;

  return async <TResponse>(
    path: string,
    options: RequestInit,
  ): Promise<TResponse> => {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        ...options,
        headers: { ...defaultHeaders, ...options?.headers },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          ...data,
          responseCode: response.status,
          responseStatus: response.statusText,
        } as TResponse;
      }

      return data;
    } catch (error) {
      return { error: (error as Error).message } as TResponse;
    }
  };
}
