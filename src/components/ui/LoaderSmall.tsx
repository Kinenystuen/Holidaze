import React from "react";
import { LoaderProps } from "../library/types";

const LoaderSmall: React.FC<LoaderProps> = ({ className }) => {
  return <div className={`loader ${className} `} />;
};

export default LoaderSmall;
