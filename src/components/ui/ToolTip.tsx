import React, { useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: "top" | "right" | "bottom" | "left";
  color?: string;
  textColor?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = "top",
  color = "#1f2937",
  textColor = "#ffffff"
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const getTooltipPosition = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2 ml-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      default:
        return "";
    }
  };

  const getArrowStyles = () => {
    const size = 6;
    const halfSize = size / 1.4;

    switch (position) {
      case "top":
        return {
          borderLeft: `${halfSize}px solid transparent`,
          borderRight: `${halfSize}px solid transparent`,
          borderTop: `${size}px solid ${color}`,
          bottom: -size,
          left: "50%",
          transform: "translateX(-50%)"
        };
      case "right":
        return {
          borderTop: `${halfSize}px solid transparent`,
          borderBottom: `${halfSize}px solid transparent`,
          borderRight: `${size}px solid ${color}`,
          left: -size,
          top: "50%",
          transform: "translateY(-50%)"
        };
      case "bottom":
        return {
          borderLeft: `${halfSize}px solid transparent`,
          borderRight: `${halfSize}px solid transparent`,
          borderBottom: `${size}px solid ${color}`,

          top: -size,
          left: "50%",
          transform: "translateX(-50%)"
        };
      case "left":
        return {
          borderTop: `${halfSize}px solid transparent`,
          borderBottom: `${halfSize}px solid transparent`,
          borderLeft: `${size}px solid ${color}`,
          right: -size,
          top: "50%",
          transform: "translateY(-50%)"
        };
      default:
        return {};
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          aria-hidden={!isVisible}
          className={`absolute z-10 px-3 py-2 whitespace-nowrap text-sm rounded shadow-lg ${getTooltipPosition()}`}
          style={{
            backgroundColor: color,
            color: textColor
          }}
        >
          {/* Tooltip text */}
          {text}
          {/* Arrow */}
          <div className="w-0 h-0 absolute" style={getArrowStyles()} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
