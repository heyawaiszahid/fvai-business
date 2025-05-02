const Info = ({ className }) => {
  return (
    <svg
      width="17"
      height="16"
      className={className}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.500001 8C0.500001 3.58172 4.08172 -1.08564e-06 8.5 -6.99382e-07C12.9183 -3.13124e-07 16.5 3.58172 16.5 8C16.5 12.4183 12.9183 16 8.5 16C4.08172 16 0.5 12.4183 0.500001 8Z"
        fill="#4169E1"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 14C7.94772 14 7.5 13.5523 7.5 13L7.5 7.5C7.5 6.94772 7.94772 6.5 8.5 6.5C9.05229 6.5 9.5 6.94772 9.5 7.5L9.5 13C9.5 13.5523 9.05228 14 8.5 14Z"
        fill="white"
      />
      <circle cx="8.5" cy="4" r="1" fill="white" />
    </svg>
  );
};

export default Info;
