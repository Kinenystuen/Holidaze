import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSwipeable } from "react-swipeable";
import Button from "../shared/Button/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
  children: React.ReactNode;
  opacity?: string;
  className?: string;
}

const ModalImage: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  handlePrevious,
  handleNext,
  opacity = "bg-opacity-90",
  className = "",
  children
}) => {
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [swipeY, setSwipeY] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
      }
    };

    const disableScroll = () => {
      document.body.style.overflow = "hidden";
    };

    const enableScroll = () => {
      document.body.style.overflow = "";
    };

    if (isOpen) {
      disableScroll();
      document.addEventListener("keydown", handleKeyDown);
    } else {
      enableScroll();
    }

    return () => {
      enableScroll();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handleNext, handlePrevious]);

  // Swipeable handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => isOpen && handleNext(),
    onSwipedRight: () => isOpen && handlePrevious(),
    onSwiping: (eventData) => {
      if (eventData.dir === "Up") {
        setSwipeY(eventData.absY);
        setShowCloseModal(true);
      }
    },
    onSwipedUp: () => {
      if (isFocused) {
        onClose();
      }
    },
    onSwipedDown: () => {
      setShowCloseModal(false);
      setIsFocused(false);
      setSwipeY(null);
    },
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  useEffect(() => {
    if (swipeY !== null && swipeY > 100) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  }, [swipeY]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black ${opacity}`}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      {...swipeHandlers}
    >
      {/* Close Button */}
      <Button
        onClick={onClose}
        className="absolute top-5 right-5 bg-transparent text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none z-[110]"
        aria-label="Close Modal"
      >
        ✕
      </Button>
      {/* Navigation Buttons */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white px-4 py-2 rounded-r-lg hover:bg-gray-700 focus:outline-none z-[110]"
        onClick={(e) => {
          e.stopPropagation();
          handlePrevious();
        }}
        aria-label="Previous image"
      >
        &#10094;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white px-4 py-2 rounded-l-lg hover:bg-gray-700 focus:outline-none z-[110]"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        aria-label="Next image"
      >
        &#10095;
      </button>
      {/* Close Modal */}
      {showCloseModal && (
        <div
          className={`absolute bottom-[10%] motion-translate-y-in-[100%] flex items-center justify-center text-white text-xl font-semibold z-[125] bg-black px-4 py-2 rounded-lg transition-all duration-700 ease-out transform translate-y-full ${
            isFocused ? "bg-color4-700" : "motion-scale-y-out-100"
          }  ${showCloseModal ? "translate-y-[-10%] opacity-100" : ""}`}
        >
          Close Image
        </div>
      )}
      {/* Modal Content */}
      <div
        className={`relative rounded-lg shadow-lg z-[100] ${className} `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      {isFocused && (
        <div className="absolute inset-0 bg-black bg-opacity-30 animate motion-preset-slide-up-sm z-[120]"></div>
      )}
    </div>,
    document.body
  );
};

export default ModalImage;
