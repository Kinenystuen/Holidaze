import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import Button from "./Button";

describe("Button Component", () => {
  test("renders correctly with children", () => {
    render(<Button>Click Me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    fireEvent.click(screen.getByRole("button", { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies correct styles based on buttonType prop", () => {
    const { rerender } = render(<Button buttonType="blue">Blue</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      "bg-blue-600 hover:bg-blue-700"
    );

    rerender(<Button buttonType="violet">Violet</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-color1 hover:bg-color3");
  });

  test("sets aria-label and title correctly", () => {
    render(
      <Button ariaLabel="Test Button" title="Test Button">
        Click
      </Button>
    );

    const button = screen.getByRole("button", { name: /test button/i });

    expect(button).toHaveAttribute("aria-label", "Test Button");
    expect(button).toHaveAttribute("title", "Test Button");
  });

  test("disables the button when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
  });
});
