const Question = ({
  index,
  text,
  options,
  placeholder = "",
  isParent = false,
  optional = false,
  value = "",
  onChange = () => {},
}) => {
  const isSelect = options && options.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <p className={`text-xl flex gap-2 ${isParent || optional ? "font-semibold italic" : ""}`}>
        {index && !optional && <span>{index}.</span>} {text}
      </p>

      {!isParent && (
        <div className="flex flex-col gap-6">
          {isSelect ? (
            <>
              {options.map((option, i) => (
                <div
                  key={i}
                  className={`bg-white text-main outline-2 transition font-semibold rounded-[10px] p-4 cursor-pointer ${
                    value === option ? "outline-main" : "outline-transparent"
                  }`}
                  onClick={() => onChange(option)}
                >
                  {option}
                </div>
              ))}
            </>
          ) : (
            <textarea
              placeholder={placeholder}
              className="bg-white outline-2 outline-transparent focus:outline-main transition rounded-[10px] p-4 min-h-36 text-body2 placeholder:text-pale-blue resize-none"
              onChange={(e) => onChange(e.target.value)}
              value={value}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
