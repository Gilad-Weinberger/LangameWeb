import React from "react";

const X = ({ failed }) => {
  if (failed) {
    return (
      <div className="bg-red-500 rounded-[3px] w-6 h-6 flex items-center justify-center">
        <p className="text-white text-sm font-semibold">X</p>
      </div>
    );
  }
  return (
    <div className="bg-gray-500 rounded-[3px] w-6 h-6 flex items-center justify-center">
      <p className="text-gray-200 text-sm font-semibold">X</p>
    </div>
  );
};

export default X;
