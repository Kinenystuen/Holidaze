import React from "react";
import { LoaderProps } from "../library/types";
import "./Loader.css";

const Loader: React.FC<LoaderProps> = () => {
  return (
    <div className="loaderArea">
      <div className={`loader`} />
    </div>
  );
};

export default Loader;
