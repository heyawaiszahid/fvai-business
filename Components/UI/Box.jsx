const Box = ({ children, className = "" }) => {
  return <div className={` font-bold ${className}`}>{children}</div>;
};

export default Box;
