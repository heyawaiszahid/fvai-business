import SignUpForm from "../signup/SignUpForm";

export const metadata = {
  title: "Join Free Course - FVAI Business",
};

export default function JoinFreeCourse() {
  return (
    <div className="pt-12 lg:pt-20 pb-12 lg:pb-20">
      <SignUpForm variant="freeCourse" />
    </div>
  );
}
