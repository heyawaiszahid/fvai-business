"use client";

import Typography from "@/Components/UI/Typography";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import { signUpSchema } from "@/schemas/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SignUpForm = ({ variant = "default" }) => {
  const [loadingStates, setLoadingStates] = useState({
    google: false,
    linkedin: false,
    email: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const content = {
    default: {
      heading: "Your valuation starts here",
      subHeading: "Create your account",
      buttonText: "Sign up with email",
      loadingText: "Signing up...",
    },
    freeCourse: {
      heading: "Sign up for free course",
      subHeading: "Join us and learn more about valuations.",
      buttonText: "Sign up for free valuation course",
      loadingText: "Signing up...",
    },
  };

  const { heading, subHeading, buttonText, loadingText } = content[variant];

  const redirectPath = variant === "freeCourse" ? "/free-course" : "/questionnaire";

  const handleGoogleSignIn = async () => {
    try {
      setLoadingStates((prev) => ({ ...prev, google: true }));
      await signIn("google", { callbackUrl: redirectPath });
    } catch (err) {
      setLoadingStates((prev) => ({ ...prev, google: false }));
      toast.error(err.message || "Failed to sign up with Google");
    }
  };

  const handleLinkedInSignIn = async () => {
    try {
      setLoadingStates((prev) => ({ ...prev, linkedin: true }));
      await signIn("linkedin", { callbackUrl: redirectPath });
    } catch (err) {
      setLoadingStates((prev) => ({ ...prev, linkedin: false }));
      toast.error(err.message || "Failed to sign up with LinkedIn");
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoadingStates((prev) => ({ ...prev, email: true }));
      const hashedPassword = await bcrypt.hash(data.password, 12);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: hashedPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Signup failed");
      }

      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: redirectPath,
      });
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoadingStates((prev) => ({ ...prev, email: false }));
    }
  };

  return (
    <div className="container lg:max-w-[767px]">
      <Typography size="h4" lg="h2" className="text-center max-w-[300px] lg:max-w-full mx-auto mb-6">
        {heading}
      </Typography>

      <Typography size="h5" lg="body1" className="text-center text-gradient mb-6">
        {subHeading}
      </Typography>

      <Button
        variant="outline"
        className="w-full mb-6"
        onClick={handleGoogleSignIn}
        disabled={loadingStates.google || loadingStates.linkedin || loadingStates.email}
      >
        {loadingStates.google ? "Signing up with Google..." : "Sign up with Google"}
      </Button>

      <Button
        variant="outline"
        className="w-full mb-6"
        onClick={handleLinkedInSignIn}
        disabled={loadingStates.google || loadingStates.linkedin || loadingStates.email}
      >
        {loadingStates.linkedin ? "Signing up with LinkedIn..." : "Sign up with Linkedin"}
      </Button>

      <div className="flex items-center gap-4 px-4 mb-6">
        <span className="w-full h-[1px] bg-dark"></span>
        <Typography size="body2" className="font-semibold shrink-0">
          Sign up with E-mail
        </Typography>
        <span className="w-full h-[1px] bg-dark"></span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" className="space-y-6 mb-6">
        <Input
          label="E-mail"
          id="email"
          type="email"
          placeholder="Your e-mail"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Your password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Input
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <Button className="w-full" disabled={loadingStates.google || loadingStates.linkedin || loadingStates.email}>
          {loadingStates.email ? loadingText : buttonText}
        </Button>
      </form>

      <Typography size="body2" className="text-center">
        Already have an account?{" "}
        <Link href="/signin" className="text-main font-semibold">
          Sign in.
        </Link>
      </Typography>
    </div>
  );
};

export default SignUpForm;
