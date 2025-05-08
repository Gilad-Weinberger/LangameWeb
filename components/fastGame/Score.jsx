import React from "react";

const Score = ({ score = false, empty = false }) => {
  if (score) {
    return (
      <div className="bg-green-500 rounded-[3px] w-5 h-5 flex items-center justify-center">
        <p className="text-white text-sm font-semibold">✓</p>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="bg-gray-200 rounded-[3px] w-5 h-5 flex items-center justify-center">
        <p className="text-gray-400 text-sm font-semibold">-</p>
      </div>
    );
  }
};

export default Score;
