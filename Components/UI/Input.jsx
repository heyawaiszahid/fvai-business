import { useState } from "react";
import Hide from "../Icons/Hide";
import Show from "../Icons/Show";

const Input = ({
  label,
  id,
  name,
  type = "text",
  placeholder,
  className = "",
  labelClassName = "text-body2 font-semibold",
  inputClassName = "p-4",
  icon,
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;
  const hasRightIcon = icon || type === "password";

  const baseStyles = `
    bg-input-field rounded-[10px] w-full 
    placeholder:text-pale-blue outline-1 outline-transparent 
    focus:outline-light-blue disabled:bg-[#e7e7e7] disabled:text-pale-blue
  `;

  const paddingStyles = `
    ${inputClassName} 
    ${hasRightIcon ? "pr-12" : ""}
  `;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          name={name || id}
          type={inputType}
          placeholder={placeholder}
          className={`${baseStyles} ${paddingStyles} ${error ? "text-red !outline-red focus:outline-red" : ""}`}
          {...props}
        />
        {hasRightIcon && (
          <div className="absolute right-0 top-0 h-full w-12 flex items-center justify-center">
            {type === "password" ? (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="w-full h-full flex items-center justify-center focus:outline-none cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? <Hide /> : <Show />}
              </button>
            ) : (
              <div className="pointer-events-none">{icon}</div>
            )}
          </div>
        )}
      </div>
      {error && <p className="text-red text-body2 font-semibold mt-1">{error}</p>}
    </div>
  );
};

export default Input;
