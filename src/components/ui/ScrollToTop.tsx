import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * ScrollToTop - Scrolls to the top of the page on navigation.
 *
 * @component
 * @returns {null}
 */

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if ((navigationType as string) === "push") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, navigationType]);

  return null;
};

export default ScrollToTop;
