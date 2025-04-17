import clsx from "clsx";

const Typography = ({ as: Tag = "p", size = "body1", lg, className = "", children, ...props }) => {
  const textStyles = {
    h1: {
      base: "text-h1 leading-h1 font-bold",
      lg: "lg:text-h1 lg:leading-h1",
    },
    h2: {
      base: "text-h2 leading-h2 font-bold",
      lg: "lg:text-h2 lg:leading-h2",
    },
    h3: {
      base: "text-h3 leading-h3 font-bold",
      lg: "lg:text-h3 lg:leading-h3",
    },
    h4: {
      base: "text-h4 leading-h4 font-bold",
      lg: "lg:text-h4 lg:leading-h4",
    },
    h5: {
      base: "text-h5 leading-h5 font-bold",
      lg: "lg:text-h5 lg:leading-h5",
    },
    body1: {
      base: "text-body1 leading-body1",
      lg: "lg:text-body1 lg:leading-body1",
    },
    body2: {
      base: "text-body2 leading-body2",
      lg: "lg:text-body2 lg:leading-body2",
    },
  };

  return (
    <Tag className={clsx(textStyles[size].base, lg && textStyles[lg].lg, className)} {...props}>
      {children}
    </Tag>
  );
};

export default Typography;
