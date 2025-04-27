import Typography from "@/Components/Typography";
import Button from "@/Components/UI/Button";
import Link from "next/link";
import SignInForm from "./SignInForm";

export const metadata = {
  title: "Sign In - FVAI Business",
};

export default function SignIn() {
  return (
    <div className="pt-12 lg:pt-20 pb-12 lg:pb-20">
      <div className="container lg:max-w-[767px] lg:max-auto">
        <Typography size="h4" lg="h2" className="text-center max-w-[300px] lg:max-w-full mx-auto mb-6">
          Welcome back!
        </Typography>
        <Typography size="h5" lg="body1" className="text-center text-gradient mb-6">
          Sign in into your account
        </Typography>
        <Button variant="outline" className="w-full mb-6">
          Sign in with Google
        </Button>
        <Button variant="outline" className="w-full mb-6">
          Sign in with Linkedin
        </Button>
        <div className="flex items-center gap-4 px-4 mb-6">
          <span className="w-full h-[1px] bg-dark"></span>
          <Typography size="body2" className="font-semibold shrink-0">
            Sign in with E-mail
          </Typography>
          <span className="w-full h-[1px] bg-dark"></span>
        </div>
        <SignInForm />
        <Typography size="body2" className="text-center mb-6">
          I forgot my password.{" "}
          <Link href="/reset-password" className="text-main font-semibold">
            Reset password.
          </Link>
        </Typography>
        <Typography size="body2" className="text-center">
          I do not have an account.{" "}
          <Link href="/signup" className="text-main font-semibold">
            Sign up.
          </Link>
        </Typography>
      </div>
    </div>
  );
}
