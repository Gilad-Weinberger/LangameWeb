import React from "react";
import Image from "next/image";
const ButtonSession = ({ handleClick, image, text, subText }) => {
  return (
      <button
        onClick={handleClick}
        className="w-full h-full bg-main hover:bg-main-hover text-white rounded-lg p-5 flex items-center gap-3"
      >
        <Image
          src={image}
          alt="Hebrew"
          width={20}
          height={20}
          className="object-contain w-8 h-8"
        />
        <div className="flex flex-col items-start">
          <p className="text-lg font-medium">{text}</p>
          <p className="text-sm text-bg">{subText}</p>
        </div>
    </button>
  );
};

export default ButtonSession;
