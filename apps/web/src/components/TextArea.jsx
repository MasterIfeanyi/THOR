"use client";
import PropTypes from "prop-types";
import React from "react";

const TextArea = ({
  id,
  name,
  value,
  onChange,
  label,
  disabled,
  required = false,
  placeholder = "",
  error = "false",
  errorMessage,
  rows = 4,
  className = "",
  onBlur,
}) => {
  return (
    <div className="relative mb-6 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-blackDark">
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className={`
                w-full px-3 py-2 mt-2 
                ${className} border rounded-md 
                font-normal text-base
                outline-none transition-all 
                disabled:opacity-70 disabled:cursor-not-allowed
                ${
                  error === "true"
                    ? "border-destructive focus:border-destructive focus:ring-destructive"
                    : "border-border focus:border-primary focus:ring-primary"
                }
                focus:ring-2 focus:ring-offset-0
                placeholder:text-muted-foreground
            `}
      />
      {error === "true" && errorMessage && (
        <small className="text-destructive relative text-xs mt-1 block">
          {errorMessage}
        </small>
      )}
    </div>
  );
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.oneOf(["true", "false"]),
  errorMessage: PropTypes.string,
  rows: PropTypes.number,
  onBlur: PropTypes.func,
};

TextArea.defaultProps = {
  required: false,
  placeholder: "",
  error: "false",
  rows: 4,
};

export default TextArea;
