const Question = ({
  index,
  text,
  options,
  placeholder,
  subQuestions = [],
  showSubQuestions = false,
  value = "",
  onChange = () => {},
  inline = false,
}) => {
  const isRadio = options && options.length > 0;
  const isTextArea = placeholder !== undefined;
  const isHeading = !isRadio && !isTextArea;

  return (
    <div className="flex flex-col gap-6">
      <p className={`text-xl flex gap-2 ${isHeading ? "font-semibold italic" : ""}`}>
        {index && <span>{index}.</span>} {text}
      </p>

      {!subQuestions.length && (
        <>
          {isRadio ? (
            <div className={`flex ${inline ? "flex-wrap gap-4" : "flex-col gap-6"}`}>
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`transition font-semibold rounded-[10px] p-4 cursor-pointer ${
                    inline ? "flex-1 lg:flex-none min-w-14 text-center" : "text-left"
                  } ${value === option ? "bg-main text-white" : "bg-white text-main"}`}
                  onClick={() => onChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : isTextArea ? (
            <textarea
              placeholder={placeholder}
              className="bg-white outline-2 outline-transparent focus:outline-main transition rounded-[10px] p-4 min-h-36 text-body2 placeholder:text-pale-blue resize-none"
              onChange={(e) => onChange(e.target.value)}
              value={value}
            />
          ) : null}
        </>
      )}

      {showSubQuestions &&
        subQuestions.map((subQ) => <Question key={`sub-${subQ.index}`} value={value} onChange={onChange} {...subQ} />)}
    </div>
  );
};

export default Question;
