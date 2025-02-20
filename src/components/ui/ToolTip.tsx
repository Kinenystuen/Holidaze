import React, { useState, useRef, useLayoutEffect } from "react";
import ReactDOM from "react-dom";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: "top" | "right" | "bottom" | "left";
  color?: string;
  textColor?: string;
  className?: string;
  delay?: number;
}

/**
 * Tooltip component that displays a text box when hovering over or focusing on a target element.
 * The tooltip automatically adjusts its position to fit within the viewport.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The element that triggers the tooltip.
 * @param {string} props.text - The tooltip text content.
 * @param {"top" | "right" | "bottom" | "left"} [props.position="bottom"] - Preferred position of the tooltip.
 *   If there's not enough space, the tooltip will automatically adjust.
 * @param {string} [props.color="#1f2937"] - Background color of the tooltip.
 * @param {string} [props.textColor="#ffffff"] - Text color inside the tooltip.
 * @param {string} [props.className=""] - Additional CSS classes for styling.
 * @param {number} [props.delay=200] - Delay in milliseconds before the tooltip appears.
 * @returns {JSX.Element} The rendered Tooltip component.
 *
 * @example
 * // Example usage of the Tooltip component
 * <Tooltip text="Hello, world!">
 *   <button>Hover over me</button>
 * </Tooltip>
 */
const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = "bottom",
  color = "#1f2937",
  textColor = "#ffffff",
  className = "",
  delay = 200
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useLayoutEffect(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const offset = 8;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Possible positions in order of preference
    const positions = ["bottom", "top", "right", "left"];

    let newPosition = position;
    let top = 0,
      left = 0;

    const fits = (pos: string) => {
      switch (pos) {
        case "bottom":
          return (
            triggerRect.bottom + tooltipRect.height + offset <= viewportHeight
          );
        case "top":
          return triggerRect.top - tooltipRect.height - offset >= 0;
        case "right":
          return (
            triggerRect.right + tooltipRect.width + offset <= viewportWidth
          );
        case "left":
          return triggerRect.left - tooltipRect.width - offset >= 0;
        default:
          return false;
      }
    };

    // Find the first available position
    newPosition =
      (positions.find((pos) => fits(pos)) as
        | "top"
        | "right"
        | "bottom"
        | "left") || "bottom";

    switch (newPosition) {
      case "top":
        top = triggerRect.top - tooltipRect.height - offset;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case "right":
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + offset;
        break;
      case "bottom":
        top = triggerRect.bottom + offset;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case "left":
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left - tooltipRect.width - offset;
        break;
    }

    left = Math.max(8, Math.min(left, viewportWidth - tooltipRect.width - 8));
    top = Math.max(8, Math.min(top, viewportHeight - tooltipRect.height - 8));

    setCoords({ top, left });
    setAdjustedPosition(newPosition);
  }, [isVisible, position]);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  /** Get arrow styles based on tooltip position */
  const getArrowStyles = (): React.CSSProperties => {
    const arrowSize = 6;
    switch (adjustedPosition) {
      case "top":
        return {
          bottom: -arrowSize,
          left: "50%",
          transform: "translateX(-50%) rotate(45deg)"
        };
      case "right":
        return {
          left: -arrowSize,
          top: "50%",
          transform: "translateY(-50%) rotate(45deg)"
        };
      case "bottom":
        return {
          top: -arrowSize,
          left: "50%",
          transform: "translateX(-50%) rotate(45deg)"
        };
      case "left":
        return {
          right: -arrowSize,
          top: "50%",
          transform: "translateY(-50%) rotate(45deg)"
        };
      default:
        return {};
    }
  };

  /** Tooltip styles */
  const tooltipStyle: React.CSSProperties = {
    position: "fixed",
    top: coords.top,
    left: coords.left,
    backgroundColor: color,
    color: textColor,
    padding: "0.5rem 0.75rem",
    borderRadius: "0.25rem",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
    whiteSpace: "nowrap",
    maxWidth: "90vw",
    zIndex: 9999,
    transition: "opacity 0.2s ease-in-out",
    opacity: isVisible ? 1 : 0
  };

  /** Tooltip JSX */
  const tooltipContent = isVisible ? (
    <div ref={tooltipRef} role="tooltip" style={tooltipStyle}>
      {text}
      <div
        style={{
          ...getArrowStyles(),
          position: "absolute",
          width: 10,
          height: 10,
          backgroundColor: color
        }}
      />
    </div>
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        className={`relative inline-block ${className}`}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>
      {ReactDOM.createPortal(tooltipContent, document.body)}
    </>
  );
};

export default Tooltip;
