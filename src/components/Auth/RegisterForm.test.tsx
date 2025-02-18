import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import RegisterForm from "./RegisterForm";
import { useAuth } from "../hooks/useAuth";

vi.mock("../hooks/useAuth");

describe("RegisterForm Component", () => {
  let mockSubmitAuth;

  beforeEach(() => {
    vi.resetAllMocks(); // Reset all mocks before each test
    mockSubmitAuth = vi.fn().mockResolvedValue({});

    (
      useAuth as unknown as { mockReturnValue: (value: unknown) => void }
    ).mockReturnValue({
      submitAuth: mockSubmitAuth,
      isLoading: false,
      error: "Registration failed"
    });
  });

  test("renders the registration form", () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  test("shows validation errors for incorrect input", async () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/Username is required./i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required./i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required./i)).toBeInTheDocument();
    });
  });

  test("shows validation errors for invalid input values", async () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.input(screen.getByLabelText(/username/i), {
      target: { value: "Noroff Test" }
    });
    fireEvent.blur(screen.getByLabelText(/username/i));

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "noroff@noroff.no" }
    });
    fireEvent.blur(screen.getByLabelText(/email/i));

    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "123" }
    });
    fireEvent.blur(screen.getByLabelText(/password/i));

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Username must start with an uppercase letter/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Please enter a valid Noroff email/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Minimum length is 8 characters./i)
      ).toBeInTheDocument();
    });
  });

  test("submits form with valid data", async () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.input(screen.getByLabelText(/Username/), {
      target: { value: "OlaNormann" }
    });
    fireEvent.blur(screen.getByLabelText(/Username/));

    fireEvent.input(screen.getByLabelText(/Email/), {
      target: { value: "OlaNormann@stud.noroff.no" }
    });
    fireEvent.blur(screen.getByLabelText(/Email/));

    fireEvent.input(screen.getByLabelText(/Password/), {
      target: { value: "Password1!" }
    });
    fireEvent.blur(screen.getByLabelText(/Password/));

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(mockSubmitAuth).toHaveBeenCalledWith(
        {
          name: "OlaNormann",
          email: "OlaNormann@stud.noroff.no",
          password: "Password1!"
        },
        "/auth/register"
      );
    });
  });

  test("displays an error message if registration fails", async () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.input(screen.getByLabelText("Username"), {
      target: { value: "JohnDoe" }
    });
    fireEvent.blur(screen.getByLabelText(/Username/));

    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "john@stud.noroff.no" }
    });
    fireEvent.blur(screen.getByLabelText(/Email/));

    fireEvent.input(screen.getByLabelText("Password"), {
      target: { value: "Password1!" }
    });
    fireEvent.blur(screen.getByLabelText(/Password/));

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await screen.findByText((content) =>
      content.includes("Registration failed")
    );
  });
});
