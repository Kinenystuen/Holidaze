import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { useNavigate } from "react-router-dom";
import GoBackBtn from "./GoBackBtn";

// Mock useNavigate
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn()
}));

describe("GoBackBtn Component", () => {
  test("renders correctly with text 'Go back'", () => {
    render(<GoBackBtn />);
    expect(screen.getByText("Go back")).toBeInTheDocument();
  });

  test("calls navigate(-1) when clicked", () => {
    const mockNavigate = vi.fn();
    (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockNavigate
    );

    render(<GoBackBtn />);
    const button = screen.getByText("Go back");

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
