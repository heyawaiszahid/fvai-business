import { Resend } from "resend";
import { ResetPasswordEmail } from "./templates/reset-password";
import { UploadLaterEmail } from "./templates/upload-later";
import { WelcomeEmail } from "./templates/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail({ email }) {
  try {
    const { error } = await resend.emails.send({
      from: "noreply@fvai.app",
      to: email,
      subject: "Welcome to FVAI Business",
      react: WelcomeEmail({ email }),
    });

    if (error) throw error;
  } catch (error) {
    throw new Error("Failed to send welcome email");
  }
}

export async function sendResetPasswordEmail({ email, resetLink }) {
  try {
    const { error } = await resend.emails.send({
      from: "noreply@fvai.app",
      to: email,
      subject: "Password Reset Request",
      react: ResetPasswordEmail({ resetLink }),
    });

    if (error) throw error;
  } catch (error) {
    throw new Error("Failed to send reset email");
  }
}

export async function sendUploadLaterEmail({ email, uploadLink }) {
  try {
    const { error } = await resend.emails.send({
      from: "noreply@fvai.app",
      to: email,
      subject: "Your Upload Later Link is Ready",
      react: UploadLaterEmail({ uploadLink }),
    });

    if (error) throw error;
  } catch (error) {
    throw new Error("Failed to send upload later email");
  }
}
