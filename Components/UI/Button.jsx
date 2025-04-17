import clsx from "clsx";
import Link from "next/link";

const baseStyles = "inline-flex justify-center p-4 rounded-[10px] border-2 text-body2 font-semibold cursor-pointer";

const variants = {
  default: "bg-main border-main text-white",
  outline: "bg-white border-main text-main",
  dark: "bg-dark border-dark text-white",
};

export default function Button({ children, variant = "default", href, className = "", ...props }) {
  const classes = clsx(baseStyles, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
