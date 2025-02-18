import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import LoginForm from "./LoginForm";
import { useAuth } from "../hooks/useAuth";
import userEvent from "@testing-library/user-event";

vi.mock("../hooks/useAuth");

describe("LoginForm Component", () => {
  let mockSubmitAuth: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.resetAllMocks();
    mockSubmitAuth = vi.fn().mockResolvedValue({});

    (
      useAuth as unknown as { mockReturnValue: (value: unknown) => void }
    ).mockReturnValue({
      submitAuth: mockSubmitAuth,
      isLoading: false,
      error: "Login failed"
    });
  });

  test("renders the login form", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("shows validation errors for incorrect input", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email is required./i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required./i)).toBeInTheDocument();
    });
  });

  test("shows validation errors for invalid input values", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.input(screen.getByLabelText(/Email/i), {
      target: { value: "OlaNormann@noroff.no" }
    });
    fireEvent.blur(screen.getByLabelText(/Email/i));

    fireEvent.input(screen.getByLabelText(/Password/i), {
      target: { value: "123" }
    });
    fireEvent.blur(screen.getByLabelText(/Password/i));

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Login failed/i)).toBeInTheDocument();
    });
  });

  test("submits form with valid data", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Email/);
    const passwordInput = screen.getByLabelText(/Password/);
    const loginButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(emailInput, "OlaNormann@stud.noroff.no");
    await userEvent.type(passwordInput, "Password1!");

    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(mockSubmitAuth).toHaveBeenCalledWith({
        email: "OlaNormann@stud.noroff.no",
        password: "Password1!"
      });
    });
  });

  test("displays an error message if registration fails", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "OlaNormann@stud.noroff.no" }
    });
    fireEvent.blur(screen.getByLabelText(/Email/));

    fireEvent.input(screen.getByLabelText("Password"), {
      target: { value: "Password1!" }
    });
    fireEvent.blur(screen.getByLabelText(/Password/));

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await screen.findByText((content) => content.includes("Login failed"));
  });
});
