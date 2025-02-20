import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Modal from "./Modal";

describe("Modal Component", () => {
  let mockOnClose: () => void;

  beforeEach(() => {
    vi.resetAllMocks();
    mockOnClose = vi.fn();
  });

  test("renders correctly when open", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    // Ensure modal is in the document
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Check for title
    expect(screen.getByText("Test Modal")).toBeInTheDocument();

    // Check for content
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  test("does not render when closed", () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose} title="Hidden Modal">
        <p>Hidden Content</p>
      </Modal>
    );

    // Ensure modal is not in the document
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("closes when clicking the close button", async () => {
    const mockOnClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    const closeButton = await screen.findByRole("button", {
      name: /Close Modal/i
    });

    // Click the close button
    fireEvent.click(closeButton);

    await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1));
  });

  test("closes when clicking outside the modal (backdrop click)", async () => {
    const mockOnClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Backdrop Test">
        <p>Content</p>
      </Modal>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("dialog"));

    await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1));
  });

  test("closes when pressing Escape key", async () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Escape Test">
        <p>Content</p>
      </Modal>
    );

    // Press Escape key
    fireEvent.keyDown(document, { key: "Escape" });

    // Ensure onClose is called
    await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1));
  });
});
