import { useState, useEffect, useCallback, useMemo } from "react";
import { apiKey } from "../library/constants/index.ts";
import * as storage from "../library/storage/index.ts";

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
  data: T; // The main data (e.g., venues)
  meta?: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number;
    totalCount: number;
  }; // The metadata about pagination
}

export function useApi<T>(
  url: string,
  options: ApiOptions = { method: "GET", body: null }
) {
  const [response, setResponse] = useState<ApiResponse<T> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Destructure options to separate dependencies
  const { method = "GET", body = null } = options;

  // Memoize headers and fetch options
  const memoizedHeaders = useMemo(() => headers("application/json"), []);
  const memoizedFetchOptions = useMemo(
    () => ({
      method,
      headers: memoizedHeaders,
      body: body ? JSON.stringify(body) : undefined
    }),
    [method, body, memoizedHeaders]
  );

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      const response = await fetch(url, memoizedFetchOptions);
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.errors?.[0]?.message || "Something went wrong.");
      }

      // Assume API returns both `data` and `meta`
      const responseData: ApiResponse<T> = {
        data: json.data ?? json, // Handle cases where `data` is directly returned
        meta: json.meta // Metadata about pagination
      };

      setResponse(responseData);
    } catch (error: unknown) {
      setIsError(true);
      if (error instanceof Error) {
        setErrorMessage(error.message || "An unexpected error occurred.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [url, memoizedFetchOptions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { response, isLoading, isError, errorMessage, fetchData };
}
