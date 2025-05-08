import React from "react";

const Score = ({ success }) => {
  if (success) {
    return (
      <div className="bg-green-500 rounded-[3px] w-5 h-5 flex items-center justify-center">
        <p className="text-white text-sm font-semibold">✓</p>
      </div>
    );
  }
  return (
    <div className="bg-red-500 rounded-[3px] w-5 h-5 flex items-center justify-center">
      <p className="text-white text-sm font-semibold">X</p>
    </div>
  );
};

export default Score;
