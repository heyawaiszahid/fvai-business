"use client";

import Typography from "@/Components/Typography";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadingStates, setLoadingStates] = useState({
    google: false,
    linkedin: false,
    email: false,
  });
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setLoadingStates((prev) => ({ ...prev, google: true }));
      setError("");
      const result = await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkedInSignIn = async () => {
    try {
      setLoadingStates((prev) => ({ ...prev, linkedin: true }));
      setError("");
      const result = await signIn("linkedin", {
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to sign in with LinkedIn");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

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

      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Sign in failed. Please check your credentials.");
    } finally {
      setLoadingStates((prev) => ({ ...prev, email: false }));
    }
  };

  return (
    <div className="container lg:max-w-[767px] lg:max-auto">
      <Typography size="h4" lg="h2" className="text-center max-w-[300px] lg:max-w-full mx-auto mb-6">
        Welcome back!
      </Typography>

      <Typography size="h5" lg="body1" className="text-center text-gradient mb-6">
        Sign in to your account
      </Typography>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

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

      <form onSubmit={handleEmailSignIn} autoComplete="off" className="space-y-6 mb-6">
        <Input
          label="E-mail"
          id="email"
          type="email"
          placeholder="Your e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
