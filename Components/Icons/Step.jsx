import Typography from "../UI/Typography";
import Tick from "./Tick";

const Step = ({ children, divider = true, variant = "inactive" }) => (
  <>
    <div
      className={`
      shrink-0 rounded-full w-10 h-10 flex items-center justify-center transition
      ${variant === "inactive" ? "bg-light-blue-gray" : "bg-main"} text-white relative
    `}
    >
      {variant === "complete" ? <Tick /> : children}
      <Typography
        size="body2"
        className={`hidden lg:block absolute left-0 top-full mt-1 whitespace-nowrap transition ${variant === "inactive" ? "text-light-blue-gray" : "text-main"}`}
      >
        Section {children}
      </Typography>
    </div>
    {divider && (
      <div className={`w-full h-1 transition ${variant === "inactive" ? "bg-light-blue-gray" : "bg-main"}`} />
    )}
  </>
);

export default Step;
