import SignUpForm from "./SignUpForm";

export const metadata = {
  title: "Sign Up - FVAI Business",
};

export default function SignUp() {
  return (
    <div className="pt-12 lg:pt-20 pb-12 lg:pb-20">
      <SignUpForm />
    </div>
  );
}
