"use client";
import React from "react";
import PropTypes from "prop-types";

const Button = ({
  className = "",
  onClick,
  disabled,
  type = "button",
  loading,
  variant = "primary",
  size = "",
  icon,
  children,
}) => {
  const baseStyles = "relative transition font-semibold focus:outline-none";

  const variantStyles = {
    primary: "bg-primary hover:bg-primary-dark text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    neutral:
      "bg-white hover:bg-gray-50 text-coolGrey border border-btnInactive",
    other:
      "bg-transparent hover:bg-gray-100 text-coolGrey border border-gray-300",
  };

  const sizeStyles = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-base w-full",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      className={`bg-black 
            ${baseStyles}
            ${variantStyles[variant]}
            ${sizeStyles[size]}
            ${disabled ? "opacity-50 cursor-not-allowed" : "flex gap-2 justify-center items-center"} ${className}`}
    >
      {icon && icon}
      {children}
      {loading && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 rounded-full border-b-2 border-white animate-spin"></div>
        </div>
      )}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "danger",
    "neutral",
    "other",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  className: PropTypes.string,
};

export default Button;
