const TextArea = ({
  label,
  id,
  name,
  placeholder,
  className = "",
  labelClassName = "text-body2 font-semibold",
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2`}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          id={id}
          name={name || id}
          placeholder={placeholder}
          className={`bg-input-field rounded-[10px] w-full p-4 placeholder:text-pale-blue outline-1 outline-transparent  focus:outline-light-blue disabled:bg-[#e7e7e7] disabled:text-pale-blue resize-none ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default TextArea;
