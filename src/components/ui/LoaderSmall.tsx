import React from "react";
import { LoaderProps } from "../library/types";
import "./Loader.css";

const LoaderSmall: React.FC<LoaderProps> = ({ className }) => {
  return <div className={`loader ${className} `} />;
};

export default LoaderSmall;
