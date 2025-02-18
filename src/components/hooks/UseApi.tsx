import { useState, useEffect, useCallback, useMemo } from "react";
import { apiKey } from "../library/constants/index";
import * as storage from "../library/storage/index";

export const headers = (contentType: string | false = false): Headers => {
  const headers = new Headers();
  const token = storage.load("token");

  if (contentType) {
    headers.append("Content-Type", contentType);
  }
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  if (apiKey) {
    headers.append("X-Noroff-API-Key", apiKey);
  }
  return headers;
};

export interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE"; // Restrict HTTP methods
  body?: Record<string, unknown> | null; // Use a generic object for request body
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number;
    totalCount: number;
  };
}

export function useApi<T>(
  url: string,
  options: ApiOptions = { method: "GET", body: null },
  manual: boolean = false
) {
  const [response, setResponse] = useState<ApiResponse<T> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { method = "GET", body = null } = options;

  const memoizedHeaders = useMemo(() => headers("application/json"), []);
  const memoizedFetchOptions = useMemo(
    () => ({
      method,
      headers: memoizedHeaders,
      body: body ? JSON.stringify(body) : undefined
    }),
    [method, body, memoizedHeaders]
  );

  const fetchData = useCallback(
    async (overrideOptions?: ApiOptions) => {
      try {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");

        const finalOptions = {
          ...memoizedFetchOptions,
          ...overrideOptions,
          body: overrideOptions?.body
            ? JSON.stringify(overrideOptions.body)
            : memoizedFetchOptions.body
        };

        const response = await fetch(url, finalOptions);
        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.errors?.[0]?.message || "Something went wrong.");
        }

        setResponse({ data: json.data ?? json, meta: json.meta });
        return json;
      } catch (error: unknown) {
        setIsError(true);
        if (error instanceof Error) {
          setErrorMessage(error.message || "An unexpected error occurred.");
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [url, memoizedFetchOptions]
  );

  useEffect(() => {
    if (!manual && method === "GET") {
      fetchData();
    }
  }, [fetchData, manual, method]);

  return { response, isLoading, isError, errorMessage, fetchData };
}
