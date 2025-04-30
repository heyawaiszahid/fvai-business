import ResetPasswordForm from "./ResetPasswordForm";

export const metadata = {
  title: "Reset Password - FVAI Business",
};

export default function ResetPassword() {
  return (
    <div className="pt-12 lg:pt-20 pb-12 lg:pb-20">
      <ResetPasswordForm />
    </div>
  );
}
