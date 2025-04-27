import Typography from "@/Components/Typography";
import Button from "@/Components/UI/Button";
import Link from "next/link";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata = {
  title: "Reset Password - FVAI Business",
};

export default function ResetPassword() {
  return (
    <div className="pt-12 lg:pt-20 pb-12 lg:pb-20">
      <div className="container lg:max-w-[767px] lg:max-auto">
        <Typography size="h4" lg="h2" className="text-center max-w-[300px] lg:max-w-full mx-auto mb-6">
          Forgot Password
        </Typography>
        <Typography size="h5" lg="body1" className="text-center text-gradient mb-6">
          Let's reset your password
        </Typography>
        <ResetPasswordForm />
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
