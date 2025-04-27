const Box = ({ children, className = "", bg = "bg-white", p, px, py }) => {
  let paddingClass = "p-4";
  if (p) paddingClass = `p-${p}`;
  else if (px || py) {
    paddingClass = `${px ? `px-${px}` : ""} ${py ? `py-${py}` : ""}`.trim();
  }

  return <div className={`${bg} rounded-default ${paddingClass} flex flex-col ${className}`}>{children}</div>;
};

export default Box;
