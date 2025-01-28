import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSwipeable } from "react-swipeable";
import Button from "../shared/Button/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  className = "",
  title,
  children
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Close modal when clicking outside
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Swipe handlers (only allow swipe if content is not scrollable)
  const swipeHandlers = useSwipeable({
    onSwipedDown: () => onClose(),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 p-2 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
      {...swipeHandlers}
    >
      <div
        className={`relative flex flex-col justify-center bg-white dark:bg-customBgDark-500 rounded-lg shadow-lg w-full max-w-4xl 
        max-h-screen overflow-y-auto p-6 ${className}`}
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        {/* Close Button */}
        <Button
          onClick={onClose}
          className="absolute z-50 top-4 right-4 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white px-3 py-1 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          aria-label="Close Modal"
        >
          ✕
        </Button>

        {/* Modal Title */}
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[80vh] px-2">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
