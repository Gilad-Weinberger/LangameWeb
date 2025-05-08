import React from "react";

const X = (failed) => {
  if (failed) {
    return <div className="bg-red-500">X</div>;
  }
  return <div className="bg-green-500">X</div>;
};

export default X;
