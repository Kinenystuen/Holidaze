import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Button from "../shared/Button/Button";

/**
 * ScrollToTopBtn Component
 *
 * This component provides a button that scrolls the page to the top when clicked.
 * The button is only visible when the user has scrolled past a certain point on the page.
 *
 * Features:
 * - Scroll to top button
 * - Visible when user has scrolled past a certain point
 * - Smooth scroll behavior
 *
 * @component
 * @example
 * // Usage:
 * <ScrollToTopBtn />
 *
 * @returns {JSX.Element} The rendered ScrollToTopBtn component.
 */
const ScrollToTopBtn: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const twoScreenHeights = window.innerHeight * 1.5; // Set screen height
      setIsVisible(window.scrollY > twoScreenHeights);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    isVisible && (
      <Button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition focus:outline-none focus:ring focus:ring-gray-500"
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </Button>
    )
  );
};

export default ScrollToTopBtn;
