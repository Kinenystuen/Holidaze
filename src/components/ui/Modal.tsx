import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../shared/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

/**
 * Modal - A modal component that displays content on top of the page content.
 * - Uses Framer Motion for animations.
 * - Prevents background scrolling when open.
 * - Closes when pressing the Escape key or clicking outside the content.
 *
 * @component
 * @param {ModalProps} props - Modal props
 * @returns {JSX.Element} The Modal component
 *
 * @example
 * // Example usage of Modal
 * <Modal isOpen={true} onClose={closeModal} title="Modal Title">
 */

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

  // Close modal only when clicking outside the content
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2"
          role="dialog"
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            className={`relative flex flex-col justify-center bg-white dark:bg-customBgDark-600 rounded-lg shadow-lg w-full max-w-4xl 
            max-h-screen overflow-y-auto p-2 py-6 md:p-6 customBox-scrollbar ${className}`}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Close Button */}
            <Button
              buttonType="violet"
              onClick={onClose}
              className="absolute z-30 w-8 h-8 top-4 right-4 px-3 py-1 transition flex items-center justify-center"
              aria-label="Close Modal"
            >
              <span className="sr-only">Close Modal</span>
              <FontAwesomeIcon icon={faClose} className="w-4 h-4" />
            </Button>

            {/* Modal Title */}
            {title && (
              <h2 className="text-lg text-center font-semibold mb-4">
                {title}
              </h2>
            )}

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
