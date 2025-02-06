import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSwipeable } from "react-swipeable";
import Button from "../shared/Button/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const DatePickerModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  className = "",
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
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Close modal on outside click
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedDown: () => onClose(),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-10"
      onClick={handleBackdropClick}
      {...swipeHandlers}
    >
      {/* Close Button */}
      <Button
        onClick={onClose}
        className="absolute top-16 md:top-4 right-4 p-1 px-3 rounded-md transition z-20"
        aria-label="Close Modal"
      >
        ✕
      </Button>

      <div
        className={`relative flex justify-center bg-white dark:bg-customBgDark-500 rounded-lg shadow-lg w-full max-w-4xl p-6 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default DatePickerModal;
