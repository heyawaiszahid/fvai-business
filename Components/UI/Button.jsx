import clsx from "clsx";
import Link from "next/link";

const baseStyles =
  "inline-flex justify-center p-4 rounded-[10px] border-2 text-body2 text-center font-semibold cursor-pointer transition";

const variants = {
  default: "bg-main border-main text-white disabled:opacity-40 disabled:cursor-not-allowed",
  outline: "bg-transparent border-main text-main disabled:opacity-40 disabled:cursor-not-allowed",
  dark: "bg-dark border-dark text-white disabled:opacity-40 disabled:cursor-not-allowed",
  light: "bg-input-field border-input-field text-main disabled:opacity-40 disabled:cursor-not-allowed",
};

const Button = ({ children, variant = "default", href, className = "", ...props }) => {
  const classes = clsx(baseStyles, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={`${classes} ${props.disabled ? "opacity-50 pointer-events-none" : ""}`} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
