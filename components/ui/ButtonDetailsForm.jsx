"use client";
import React from "react";

export const ButtonDetailsForm = ({
  children,
  className = "",
  variant = "primary",
  size = "medium",
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  ...props
}) => {
  const baseClasses =
    "font-medium rounded-lg transition-colors focus:outline-none";

  const sizeClasses = {
    small: "py-2 px-3 text-sm",
    medium: "py-3 px-4",
    large: "py-4 px-6 text-lg",
  };

  const variantClasses = {
    primary: "bg-main hover:bg-main-hover text-white",
    secondary:
      "bg-white border border-gray-300 hover:bg-gray-50 text-text-primary",
    ghost: "bg-transparent hover:bg-gray-100 text-text-primary",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`;

  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonDetailsForm;
