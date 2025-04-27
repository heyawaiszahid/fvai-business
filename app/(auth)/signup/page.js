"use client";

import Typography from "@/Components/Typography";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import Link from "next/link";

export default function SignUp() {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

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
        <form onSubmit={handleLogin} autoComplete="off" className="space-y-6 mb-6">
          <Input label="E-mail" id="email" type="email" placeholder="Your e-mail" />
          <Input label="Password" id="password" type="password" placeholder="Your password" />
          <Input label="Confirm Password" id="password2" type="password" placeholder="Your password" />
          <Button className="w-full">Sign up with email</Button>
        </form>
        <Typography size="body2" className="text-center">
          Already have an account?{" "}
          <Link href="/" className="text-main font-semibold">
            Sign in.
          </Link>
        </Typography>
      </div>
    </div>
  );
}
