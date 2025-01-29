import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
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

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2"
          onClick={handleBackdropClick}
          {...swipeHandlers}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            className={`relative flex flex-col justify-center bg-white dark:bg-customBgDark-500 rounded-lg shadow-lg w-full max-w-4xl 
            max-h-screen overflow-y-auto p-6 ${className}`}
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
