import { render, screen } from "@testing-library/react";
import { FormatDate } from "./FormatDate";

describe("FormatDate Component", () => {
  test("Renders a valid formatted date", () => {
    render(<FormatDate dateString="2025-02-18T12:30:00Z" />);
    expect(screen.getByText(/18\.02\.2025/)).toBeInTheDocument();
  });

  test("Renders 'Invalid date' for null input", () => {
    render(<FormatDate dateString={null} />);
    expect(screen.getByText("Invalid date")).toBeInTheDocument();
  });

  test("Renders 'Invalid date' for an invalid date string", () => {
    render(<FormatDate dateString="invalid-date" />);
    expect(screen.getByText("Invalid date")).toBeInTheDocument();
  });

  test("Applies left alignment class", () => {
    const { container } = render(
      <FormatDate dateString="2025-02-18T12:30:00Z" position="left" />
    );
    expect(container.firstChild).toHaveClass("text-left");
  });

  test("Applies center alignment class (default)", () => {
    const { container } = render(
      <FormatDate dateString="2025-02-18T12:30:00Z" />
    );
    expect(container.firstChild).toHaveClass("text-left");
  });

  test("Applies right alignment class", () => {
    const { container } = render(
      <FormatDate dateString="2025-02-18T12:30:00Z" position="right" />
    );
    expect(container.firstChild).toHaveClass("text-right");
  });
});
