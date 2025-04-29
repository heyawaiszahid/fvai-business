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
  inputClassName = "bg-input-field rounded-[10px] w-full p-4 pr-12 placeholder:text-pale-blue focus:outline-1 focus:outline-light-blue disabled:bg-[#e7e7e7]",
  icon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;
  const inputPadding = icon || type === "password" ? "pr-12" : "px-4";

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
          className={`${inputClassName} ${inputPadding}`}
          {...props}
        />
        {(type === "password" || icon) && (
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
    </div>
  );
};

export default Input;
