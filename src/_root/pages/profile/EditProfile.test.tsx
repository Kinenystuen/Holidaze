import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { vi } from "vitest";
import EditProfile from "./EditProfile";
import { useUserContext } from "../../../components/context/useUserContext";
import { useApi } from "../../../components/hooks/UseApi";

// Mock `useUserContext`
vi.mock("../../../components/context/useUserContext", () => ({
  useUserContext: vi.fn()
}));

// Mock `useApi`
vi.mock("../../../components/hooks/UseApi", () => ({
  useApi: vi.fn()
}));

describe("EditProfile Component", () => {
  let mockSetUser, mockFetchData;

  beforeEach(() => {
    vi.resetAllMocks();

    // 🔹 Mock user context
    mockSetUser = vi.fn();
    (useUserContext as ReturnType<typeof vi.fn>).mockReturnValue({
      user: {
        name: "OlaNormann",
        email: "OlaNormann.doe@stud.noroff.no",
        bio: "Hello, I'm OlaNormann!",
        avatar: { url: "avatar.jpg", alt: "OlaNormann's avatar" },
        banner: { url: "banner.jpg", alt: "OlaNormann's banner" },
        venueManager: false
      },
      setUser: mockSetUser
    });

    // 🔹 Mock API call
    mockFetchData = vi.fn().mockResolvedValue(true);
    (useApi as ReturnType<typeof vi.fn>).mockReturnValue({
      fetchData: mockFetchData,
      isLoading: false,
      isError: false,
      errorMessage: ""
    });
  });

  test("renders edit profile button", () => {
    render(<EditProfile />);

    expect(
      screen.getByRole("button", { name: /edit profile/i })
    ).toBeInTheDocument();
  });

  test("opens modal when edit button is clicked", () => {
    render(<EditProfile />);

    fireEvent.click(screen.getByRole("button", { name: /edit profile/i }));

    expect(
      screen.getByRole("heading", { name: /edit profile/i })
    ).toBeInTheDocument();
  });

  test("updates profile preview", async () => {
    render(<EditProfile />);

    fireEvent.click(screen.getByRole("button", { name: /Edit Profile/i }));

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /Edit Profile/i })
      ).toBeInTheDocument()
    );

    // Wait for input fields to render
    await waitFor(() => {
      expect(screen.getByLabelText(/Bio/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Bio/i), {
      target: { value: "Updated bio" }
    });
    fireEvent.change(screen.getByLabelText(/Avatar URL/i), {
      target: { value: "new-avatar.jpg" }
    });
    fireEvent.change(screen.getByLabelText(/Banner URL/i), {
      target: { value: "new-banner.jpg" }
    });

    await waitFor(() => {
      expect(screen.getByText(/Updated bio/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByAltText(/avatar preview/i)).toHaveAttribute(
        "src",
        "new-avatar.jpg"
      );
    });

    await waitFor(() => {
      expect(screen.getByAltText(/banner preview/i)).toHaveAttribute(
        "src",
        "new-banner.jpg"
      );
    });

    fireEvent.click(screen.getByRole("button", { name: /Save Changes/i }));
  });

  test("displays error message when API call fails", async () => {
    (useApi as ReturnType<typeof vi.fn>).mockReturnValue({
      fetchData: vi.fn().mockResolvedValue(false),
      isLoading: false,
      isError: true,
      errorMessage: "Failed to update profile"
    });

    render(<EditProfile />);

    fireEvent.click(screen.getByRole("button", { name: /edit profile/i }));
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to update profile/i)).toBeInTheDocument();
    });
  });
});
