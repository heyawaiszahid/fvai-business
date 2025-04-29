import SignInForm from "./SignInForm";

export const metadata = {
  title: "Sign In - FVAI Business",
};

export default function SignIn() {
  return (
    <div className="pt-12 lg:pt-20 pb-12 lg:pb-20">
      <SignInForm />
    </div>
  );
}
