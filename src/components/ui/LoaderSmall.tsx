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
 * <LoaderSmall />
 *
 * @returns {JSX.Element} The rendered Loader component
 */

const LoaderSmall: React.FC<LoaderProps> = ({ className }) => {
  return <div className={`loader ${className} `} />;
};

export default LoaderSmall;
