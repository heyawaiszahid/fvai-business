const Spinner = ({ size = "md", className }) => {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <div className={`animate-spin rounded-full border-t-2 border-b-2 border-main ${sizes[size]} ${className}`}></div>
  );
};

export default Spinner;
