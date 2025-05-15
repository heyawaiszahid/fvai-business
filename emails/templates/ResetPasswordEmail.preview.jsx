import { ResetPasswordEmail } from "./reset-password";

const ResetPasswordPreview = ResetPasswordEmail;

ResetPasswordPreview.PreviewProps = {
  email: "test@example.com",
  resetLink: "https://example.com/reset?token=preview",
};

export default ResetPasswordPreview;
