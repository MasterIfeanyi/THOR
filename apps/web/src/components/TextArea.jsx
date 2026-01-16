"use client"
import React from 'react'
import PropTypes from 'prop-types';

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
    onBlur
}) => {

  return (
    <div className="w-full relative mb-6">
        {label && (
            <label 
                htmlFor={id} 
                className="text-sm text-blackDark font-medium"
            >
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
                ${className}
                w-full px-3 py-2 mt-2 
                bg-white border rounded-md 
                font-light text-sm
                outline-none transition
                disabled:opacity-70 disabled:cursor-not-allowed
                ${error === "true" 
                    ? "border-danger focus:border-danger focus:ring-danger" 
                    : "border-gray-300 focus:border-primary focus:ring-primary"
                }
                focus:ring-1
            `}
        />
        {error === "true" && errorMessage && (
            <small className="text-danger relative">
                {errorMessage}
            </small>
        )}
    </div>
  )
}

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.oneOf(['true', 'false']),
  errorMessage: PropTypes.string,
  rows: PropTypes.number,
  onBlur: PropTypes.func,
}

TextArea.defaultProps = {
  required: false,
  placeholder: "",
  error: "false",
  rows: 4,
}

export default TextArea