"use client";

import SuccessIllustation from "@/Components/Icons/SuccessIllustation";
import Typography from "@/Components/Typography";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import { confirmPasswordSchema, emailSchema } from "@/schemas/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ResetPasswordForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const searchParams = useSearchParams();
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");
    setHasToken(!!token);
  }, [searchParams]);

  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
  });

  const passwordForm = useForm({
    resolver: zodResolver(confirmPasswordSchema),
  });

  const sendResetLink = async (data) => {
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        throw new Error(result.error || "Failed to send reset link");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  const resetPassword = async (data) => {
    try {
      const token = searchParams.get("token");
      const response = await fetch("/api/auth/reset-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          token,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        passwordForm.reset();
        setIsPasswordUpdated(true);
        toast.success("Password updated successfully! Redirecting to login in 5 seconds...", {
          onClose: () => (window.location.href = "/signin"),
        });
      } else {
        throw new Error(result.error || "Failed to reset password");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div className="container lg:max-w-[887px] lg:max-auto">
      {hasToken ? (
        !isSuccess ? (
          <div>
            <Typography size="h4" lg="h2" className="text-center max-w-[300px] lg:max-w-full mx-auto mb-6">
              Reset Password
            </Typography>
            <Typography size="h5" lg="body1" className="text-center text-gradient mb-6">
              Set a new password
            </Typography>
            <form
              onSubmit={passwordForm.handleSubmit(resetPassword)}
              noValidate
              autoComplete="off"
              className="space-y-6 mb-6"
            >
              <Input
                label="Password"
                type="password"
                placeholder="Your Password"
                error={passwordForm.formState.errors.password?.message}
                {...passwordForm.register("password")}
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                error={passwordForm.formState.errors.confirmPassword?.message}
                {...passwordForm.register("confirmPassword")}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isPasswordUpdated || passwordForm.formState.isSubmitting}
              >
                {passwordForm.formState.isSubmitting
                  ? "Saving..."
                  : isPasswordUpdated
                    ? "Password Updated"
                    : "Set New Password"}
              </Button>
            </form>
            <Typography size="body2" className="text-center">
              I do not have an account.{" "}
              <Link href="/signup" className="text-main font-semibold">
                Sign up.
              </Link>
            </Typography>
          </div>
        ) : (
          <div className="flex flex-col gap-6 items-center">
            <SuccessIllustation />
            <div className="flex flex-col gap-4 items-center">
              <Typography size="h4" lg="h2" className="text-center">
                Password reset successfully!
              </Typography>
              <Typography size="body2" className="text-center">
                Your password has been updated. You can now login with your new password.
              </Typography>
              <Link href="/login">
                <Button className="w-2xs">Go to Login</Button>
              </Link>
            </div>
          </div>
        )
      ) : !isSuccess ? (
        <div>
          <Typography size="h4" lg="h2" className="text-center max-w-[300px] lg:max-w-full mx-auto mb-6">
            Forgot Password
          </Typography>
          <Typography size="h5" lg="body1" className="text-center text-gradient mb-6">
            Let's reset your password
          </Typography>
          <form
            onSubmit={emailForm.handleSubmit(sendResetLink)}
            noValidate
            autoComplete="off"
            className="space-y-6 mb-6"
          >
            <Input
              label="E-mail"
              id="email"
              type="email"
              placeholder="Your e-mail"
              {...emailForm.register("email")}
              error={emailForm.formState.errors.email?.message}
            />
            <Button type="submit" className="w-full" disabled={emailForm.formState.isSubmitting}>
              {emailForm.formState.isSubmitting ? "Sending..." : "Reset Password"}
            </Button>
          </form>
          <Typography size="body2" className="text-center">
            I do not have an account.{" "}
            <Link href="/signup" className="text-main font-semibold">
              Sign up.
            </Link>
          </Typography>
        </div>
      ) : (
        <div className="flex flex-col gap-6 items-center">
          <SuccessIllustation />
          <div className="flex flex-col gap-4 items-center">
            <Typography size="h4" lg="h2" className="text-center">
              Password link has been sent!
            </Typography>
            <Typography size="body2" className="text-center">
              A password reset link has been sent to your email address. Please check your inbox.
            </Typography>
            <Button className="w-2xs">Go to your email</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordForm;
