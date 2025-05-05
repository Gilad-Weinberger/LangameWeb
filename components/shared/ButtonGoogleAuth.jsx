"use client";
import Image from "next/image";

const ButtonGoogleAuth = ({
  onClick,
  isSubmitting,
  buttonText = "התחבר עם גוגל",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isSubmitting}
      className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {buttonText}
      <div className="mr-2">
        <Image src="/google.svg" alt="Google" width={20} height={20} />
      </div>
    </button>
  );
};

export default ButtonGoogleAuth;
