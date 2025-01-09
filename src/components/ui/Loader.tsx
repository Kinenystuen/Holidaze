import React from "react";
import { LoaderProps } from "../library/types";

const Loader: React.FC<LoaderProps> = () => {
  return (
    <div className="loaderArea">
      <div className={`loader`} />
    </div>
  );
};

export default Loader;
