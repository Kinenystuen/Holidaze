import React from "react";
import "./FixedImage.css";

interface FixedImageProps {
  className?: string;
  imageUrl: string;
  alt?: string;
  overlayColor?: string;
  children?: React.ReactNode;
  backgroundPosition?: string;
}

const FixedImage: React.FC<FixedImageProps> = ({
  className = "",
  imageUrl,
  alt = "Fixed background image",
  overlayColor,
  children,
  backgroundPosition = "center"
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-fixed bg-cover"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundPosition
        }}
        aria-label={alt}
        role="img"
      ></div>
      {/* Optional Overlay */}
      {overlayColor && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: overlayColor, mixBlendMode: "multiply" }}
        ></div>
      )}

      {/* Content inside the fixed image */}
      <div className="relative z-10 flex items-center justify-center h-full text-white text-center p-6">
        {children}
      </div>
    </div>
  );
};

export default FixedImage;
