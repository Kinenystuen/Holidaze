import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useEffect } from "react";
import { useApi, ApiResponse } from "../../components/hooks/UseApi";

// Mock `fetch`
global.fetch = vi.fn();

describe("useApi Hook", () => {
  const mockUrl = "https://api.example.com/data";

  const mockSuccessResponse: ApiResponse<{ message: string }> = {
    data: { message: "Success" },
    meta: {
      isFirstPage: true,
      isLastPage: true,
      currentPage: 1,
      previousPage: null,
      nextPage: null,
      pageCount: 1,
      totalCount: 1
    }
  };

  const mockErrorResponse = { errors: [{ message: "Failed request" }] };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  // Test Component to use the hook
  function TestComponent({ manual = false }: { manual?: boolean }) {
    const { response, fetchData, isLoading, isError, errorMessage } = useApi<{
      message: string;
    }>(mockUrl, { method: "GET" }, manual);

    useEffect(() => {
      if (!manual) fetchData();
    }, [fetchData, manual]);

    return (
      <div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {errorMessage}</p>}
        {response?.data?.message && <p>Response: {response.data.message}</p>}
      </div>
    );
  }

  test("fetches data successfully", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => mockSuccessResponse
    });

    render(<TestComponent />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("Response: Success")).toBeInTheDocument()
    );
  });

  test("handles API failure correctly", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      json: async () => mockErrorResponse
    });

    render(<TestComponent />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("Error: Failed request")).toBeInTheDocument()
    );
  });

  test("does not fetch automatically in manual mode", async () => {
    render(<TestComponent manual />);

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.queryByText("Response: Success")).not.toBeInTheDocument();
  });
});
