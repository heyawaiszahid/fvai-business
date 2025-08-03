const Radio = ({ className, active = false }) => {
  return (
    <svg
      width="25"
      height="25"
      className={className}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12.8691" cy="12.5" r="9" stroke="#4169E1" strokeWidth="2" />
      {active && <circle cx="12.8691" cy="12.5" r="4" fill="#4169E1" />}
    </svg>
  );
};

export default Radio;
