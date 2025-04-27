import Typography from "@/Components/Typography";
import Button from "@/Components/UI/Button";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export const metadata = {
  title: "Sign Up - FVAI Business",
};

export default function SignUp() {
  return (
    <div className="pt-12 lg:pt-20 pb-12 lg:pb-20">
      <div className="container lg:max-w-[767px] lg:max-auto">
        <Typography size="h4" lg="h2" className="text-center max-w-[300px] lg:max-w-full mx-auto mb-6">
          Your valuation starts here
        </Typography>
        <Typography size="h5" lg="body1" className="text-center text-gradient mb-6">
          Create your account
        </Typography>
        <Button variant="outline" className="w-full mb-6">
          Sign up with Google
        </Button>
        <Button variant="outline" className="w-full mb-6">
          Sign up with Linkedin
        </Button>
        <div className="flex items-center gap-4 px-4 mb-6">
          <span className="w-full h-[1px] bg-dark"></span>
          <Typography size="body2" className="font-semibold shrink-0">
            Sign up with E-mail
          </Typography>
          <span className="w-full h-[1px] bg-dark"></span>
        </div>
        <SignUpForm />
        <Typography size="body2" className="text-center">
          Already have an account?{" "}
          <Link href="/signin" className="text-main font-semibold">
            Sign in.
          </Link>
        </Typography>
      </div>
    </div>
  );
}
