import React, { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

/**
 * Floating-label input with eye toggle for passwords.
 * - Uses peer to animate label based on focus/value.
 * - Eye icon is positioned inside input field.
 */
const Input = ({ value, onChange, label, placeholder = "", type = "text", id }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [filled, setFilled] = useState(Boolean(value));

  useEffect(() => setFilled(Boolean(value)), [value]);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;
  const inputId = id || label?.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="relative w-full">
      {/* Input */}
      <input
        id={inputId}
        type={inputType}
        value={value}
        onChange={(e) => {
          onChange?.(e);
          setFilled(Boolean(e.target.value));
        }}
        placeholder=" "
        className="peer w-full bg-transparent border border-gray-300 rounded-lg py-3 px-4 pr-12 text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        aria-label={label}
      />

      {/* Floating Label */}
      <label
        htmlFor={inputId}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          filled
            ? "-top-2.5 text-xs text-purple-600 bg-white px-1"
            : "top-3 text-sm text-gray-500"
        } peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-purple-600 peer-focus:bg-white peer-focus:px-1`}
      >
        {label}
      </label>

      {/* Password Eye Toggle */}
      {type === "password" && (
        <button
          type="button"
          onClick={toggleShowPassword}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
        >
          {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
        </button>
      )}
    </div>
  );
};

export default Input;
