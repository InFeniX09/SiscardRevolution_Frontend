import React from "react";
import { Triangle } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black bg-opacity-20">
      <Triangle
        visible={true}
        height="150"
        width="150"
        color="#E62532"
        ariaLabel="triangle-loading"
      />
    </div>
  );
}
