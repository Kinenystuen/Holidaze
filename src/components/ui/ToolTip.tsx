import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: "top" | "right" | "bottom" | "left";
  color?: string;
  textColor?: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = "top",
  color = "#1f2937",
  textColor = "#ffffff",
  className
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  // When the tooltip becomes visible, calculate the trigger element's position.
  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const offset = 8;
      let top = 0;
      let left = 0;
      switch (position) {
        case "top":
          top = rect.top - offset;
          left = rect.left + rect.width / 2;
          break;
        case "right":
          top = rect.top + rect.height / 2;
          left = rect.right + offset;
          break;
        case "bottom":
          top = rect.bottom + offset;
          left = rect.left + rect.width / 2;
          break;
        case "left":
          top = rect.top + rect.height / 2;
          left = rect.left - offset;
          break;
        default:
          break;
      }
      setCoords({ top, left });
    }
  }, [isVisible, position]);

  // Determine the tooltip's transform so that it appears correctly relative to the trigger.
  const getTransform = () => {
    switch (position) {
      case "top":
        return "translate(-50%, -100%)";
      case "right":
        return "translate(0, -50%)";
      case "bottom":
        return "translate(-50%, 0)";
      case "left":
        return "translate(-100%, -50%)";
      default:
        return "";
    }
  };

  const tooltipStyle: React.CSSProperties = {
    position: "fixed",
    top: coords.top,
    left: coords.left,
    transform: getTransform(),
    backgroundColor: color,
    color: textColor,
    padding: "0.5rem 0.75rem",
    borderRadius: "0.25rem",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
    whiteSpace: "nowrap",
    zIndex: 9999
  };

  // Compute arrow styles based on the tooltip position.
  const getArrowStyles = (): React.CSSProperties => {
    const arrowSize = 6;
    const halfArrow = arrowSize / 2;
    switch (position) {
      case "top":
        return {
          position: "absolute",
          bottom: -arrowSize,
          left: "50%",
          transform: "translateX(-50%)",
          borderLeft: `${halfArrow}px solid transparent`,
          borderRight: `${halfArrow}px solid transparent`,
          borderTop: `${arrowSize}px solid ${color}`
        };
      case "right":
        return {
          position: "absolute",
          left: -arrowSize,
          top: "50%",
          transform: "translateY(-50%)",
          borderTop: `${halfArrow}px solid transparent`,
          borderBottom: `${halfArrow}px solid transparent`,
          borderRight: `${arrowSize}px solid ${color}`
        };
      case "bottom":
        return {
          position: "absolute",
          top: -arrowSize,
          left: "50%",
          transform: "translateX(-50%)",
          borderLeft: `${halfArrow}px solid transparent`,
          borderRight: `${halfArrow}px solid transparent`,
          borderBottom: `${arrowSize}px solid ${color}`
        };
      case "left":
        return {
          position: "absolute",
          right: -arrowSize,
          top: "50%",
          transform: "translateY(-50%)",
          borderTop: `${halfArrow}px solid transparent`,
          borderBottom: `${halfArrow}px solid transparent`,
          borderLeft: `${arrowSize}px solid ${color}`
        };
      default:
        return {};
    }
  };

  // Render the tooltip (with its arrow) into document.body via a portal.
  const tooltipContent = isVisible ? (
    <div role="tooltip" aria-hidden={!isVisible} style={tooltipStyle}>
      {text}
      <div style={getArrowStyles()} />
    </div>
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        className={`relative inline-block ${className}`}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {ReactDOM.createPortal(tooltipContent, document.body)}
    </>
  );
};

export default Tooltip;
