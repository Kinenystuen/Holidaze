import React from "react";
import { LoaderProps } from "../library/types";
import "./Loader.css";

/**
 * Loader Component
 *
 * The Loader component displays a spinning loader icon.
 *
 * @component
 * @example
 * // Usage:
 * <Loader />
 *
 * @returns {JSX.Element} The rendered Loader component
 */
const Loader: React.FC<LoaderProps> = () => {
  return (
    <div className="loaderArea">
      <div className={`loader`} />
    </div>
  );
};

export default Loader;
