const Question = ({
  question,
  options,
  placeholder = "",
  value = "",
  onChange = () => {},
  index,
  isParent = false,
  extra = null,
}) => {
  const isSelect = options && options.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <p className={`text-xl flex gap-2 ${isParent ? "font-semibold italic" : ""}`}>
        {index && <span>{index}.</span>} {question}
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

          {extra && (
            <div className="flex flex-col gap-6">
              <p className="text-xl flex gap-2 font-semibold italic">{extra.text}</p>
              <textarea
                placeholder={extra.placeholder}
                className="bg-white outline-2 outline-transparent focus:outline-main transition rounded-[10px] p-4 min-h-36 text-body2 placeholder:text-pale-blue resize-none"
                onChange={(e) => onChange({ main: value, extra: e.target.value })}
                value={typeof value === "object" ? value.extra : ""}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
