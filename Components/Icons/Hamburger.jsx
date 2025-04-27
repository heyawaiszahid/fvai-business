const Hamburger = ({ className }) => {
  return (
    <svg
      width="32"
      height="32"
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2.66669" y="4" width="26.6667" height="2.66667" rx="1.33333" fill="#4169E1" />
      <rect x="2.66669" y="14.6667" width="26.6667" height="2.66667" rx="1.33333" fill="#4169E1" />
      <rect x="2.66669" y="25.3333" width="26.6667" height="2.66667" rx="1.33333" fill="#4169E1" />
    </svg>
  );
};

export default Hamburger;
