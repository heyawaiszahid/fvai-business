const Done = ({ className }) => {
  return (
    <svg
      width="80"
      height="80"
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="40" cy="40" r="40" fill="#62E759" />
      <path
        d="M20 39.375L33.9595 53.5526C34.743 54.3483 36.0263 54.3483 36.8097 53.5526L60 30"
        stroke="#F3F6FE"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Done;
