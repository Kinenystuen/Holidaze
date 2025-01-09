import React from "react";

interface FixedImageProps {
  className?: string;
  imageUrl: string;
  alt?: string;
  overlayColor?: string;
}

const FixedImage: React.FC<FixedImageProps> = ({
  className = "",
  imageUrl,
  alt = "Fixed background image",
  overlayColor
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url('${imageUrl}')`
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
    </div>
  );
};

export default FixedImage;
