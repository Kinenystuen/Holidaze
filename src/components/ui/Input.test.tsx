import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { useForm } from "react-hook-form";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";

interface TestFormProps {
  InputId: string;
  InputLabel: string;
  [key: string]: unknown;
}

// Helper component to test Input inside a form
const TestForm = ({ InputId, InputLabel, ...props }: TestFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <Input
        InputId={InputId}
        InputLabel={InputLabel}
        register={register}
        errors={errors}
        {...props}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

describe("Input Component", () => {
  test("renders with label", () => {
    render(<TestForm InputId="username" InputLabel="Username" />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  test("renders with an icon", () => {
    render(<TestForm InputId="username" InputLabel="Username" icon={faUser} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  test("allows user input", () => {
    render(<TestForm InputId="username" InputLabel="Username" />);
    const input = screen.getByLabelText("Username");

    fireEvent.change(input, { target: { value: "JohnDoe" } });
    expect(input).toHaveValue("JohnDoe");
  });

  test("displays required validation error", async () => {
    render(<TestForm InputId="username" InputLabel="Username" required />);

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Username is required.")).toBeInTheDocument();
    });
  });

  test("displays minLength validation error", async () => {
    render(<TestForm InputId="username" InputLabel="Username" minLength={5} />);

    const input = screen.getByLabelText("Username");
    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.blur(input);

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Minimum length is 5 characters.")
      ).toBeInTheDocument();
    });
  });

  test("displays pattern validation error", async () => {
    render(
      <TestForm
        InputId="username"
        InputLabel="Username"
        pattern={{
          value: /^[A-Z]/,
          message: "Must start with an uppercase letter."
        }}
      />
    );

    const input = screen.getByLabelText("Username");
    fireEvent.change(input, { target: { value: "john" } });
    fireEvent.blur(input);

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Must start with an uppercase letter.")
      ).toBeInTheDocument();
    });
  });

  test("does not show error when input is valid", async () => {
    render(
      <TestForm
        InputId="username"
        InputLabel="Username"
        minLength={3}
        pattern={{ value: /^[A-Z]/, message: "Must start with uppercase" }}
      />
    );

    const input = screen.getByLabelText("Username");
    fireEvent.change(input, { target: { value: "John" } });
    fireEvent.blur(input);

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByText("Must start with uppercase")
      ).not.toBeInTheDocument();
    });
  });
});
