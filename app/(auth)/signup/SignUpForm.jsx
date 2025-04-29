"use client";

import Typography from "@/Components/Typography";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpForm = ({ variant = "default" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: redirectPath });
  };

  const handleLinkedInSignIn = () => {
    signIn("linkedin", { callbackUrl: redirectPath });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: hashedPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Signup failed");
      }

      await signIn("credentials", {
        email,
        password,
        callbackUrl: redirectPath,
      });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container lg:max-w-[767px] lg:max-auto">
      <Typography size="h4" lg="h2" className="text-center max-w-[300px] lg:max-w-full mx-auto mb-6">
        {heading}
      </Typography>

      <Typography size="h5" lg="body1" className="text-center text-gradient mb-6">
        {subHeading}
      </Typography>

      <Button variant="outline" className="w-full mb-6" onClick={handleGoogleSignIn}>
        Sign up with Google
      </Button>

      <Button variant="outline" className="w-full mb-6" onClick={handleLinkedInSignIn}>
        Sign up with Linkedin
      </Button>

      <div className="flex items-center gap-4 px-4 mb-6">
        <span className="w-full h-[1px] bg-dark"></span>
        <Typography size="body2" className="font-semibold shrink-0">
          Sign up with E-mail
        </Typography>
        <span className="w-full h-[1px] bg-dark"></span>
      </div>

      <form onSubmit={handleSignUp} autoComplete="off" className="space-y-6 mb-6">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
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
          placeholder="Your password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          label="Confirm Password"
          id="password2"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button className="w-full" disabled={isLoading}>
          {isLoading ? loadingText : buttonText}
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
