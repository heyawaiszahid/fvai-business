"use client";

import Typography from "@/Components/Typography";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import { signInSchema } from "@/schemas/signin";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SignInForm = () => {
  const router = useRouter();

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
    resolver: zodResolver(signInSchema),
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");

    if (error === "OAuthAccountNotLinked") {
      toast.error("This email is already registered using another method. Please sign in using that method.");
    }
  }, [searchParams]);

  const handleGoogleSignIn = async () => {
    try {
      setLoadingStates((prev) => ({ ...prev, google: true }));
      const result = await signIn("google", {
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (err) {
      toast.error(err.message || "Failed to sign in with Google");
    } finally {
      setLoadingStates((prev) => ({ ...prev, google: false }));
    }
  };

  const handleLinkedInSignIn = async () => {
    try {
      setLoadingStates((prev) => ({ ...prev, linkedin: true }));
      const result = await signIn("linkedin", {
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (err) {
      toast.error(err.message || "Failed to sign in with LinkedIn");
    } finally {
      setLoadingStates((prev) => ({ ...prev, linkedin: false }));
    }
  };

  const handleEmailSignIn = async (data) => {
    const { email, password } = data;

    try {
      setLoadingStates((prev) => ({ ...prev, email: true }));
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.ok) {
        router.push("/dashboard");
      }
    } catch (err) {
      toast.error(err.message || "Sign in failed. Please check your credentials.");
    } finally {
      setLoadingStates((prev) => ({ ...prev, email: false }));
    }
  };

  return (
    <div className="container lg:max-w-[767px]">
      <Typography size="h4" lg="h2" className="text-center max-w-[300px] lg:max-w-full mx-auto mb-6">
        Welcome back!
      </Typography>

      <Typography size="h5" lg="body1" className="text-center text-gradient mb-6">
        Sign in to your account
      </Typography>

      <Button
        variant="outline"
        className="w-full mb-6"
        onClick={handleGoogleSignIn}
        disabled={loadingStates.google || loadingStates.linkedin || loadingStates.email}
      >
        {loadingStates.google ? "Signing in with Google..." : "Sign in with Google"}
      </Button>

      <Button
        variant="outline"
        className="w-full mb-6"
        onClick={handleLinkedInSignIn}
        disabled={loadingStates.google || loadingStates.linkedin || loadingStates.email}
      >
        {loadingStates.linkedin ? "Signing in with LinkedIn..." : "Sign in with LinkedIn"}
      </Button>

      <div className="flex items-center gap-4 px-4 mb-6">
        <span className="w-full h-[1px] bg-dark"></span>
        <Typography size="body2" className="font-semibold shrink-0">
          Sign in with E-mail
        </Typography>
        <span className="w-full h-[1px] bg-dark"></span>
      </div>

      <form onSubmit={handleSubmit(handleEmailSignIn)} noValidate autoComplete="off" className="space-y-6 mb-6">
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
        <Button
          className="w-full"
          type="submit"
          disabled={loadingStates.google || loadingStates.linkedin || loadingStates.email}
        >
          {loadingStates.email ? "Signing in with Email..." : "Sign in with email"}
        </Button>
      </form>

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
  );
};

export default SignInForm;
