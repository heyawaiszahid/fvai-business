"use client";

import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";

const SignInForm = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <form onSubmit={handleLogin} autoComplete="off" className="space-y-6 mb-6">
      <Input label="E-mail" id="email" type="email" placeholder="Your e-mail" />
      <Input label="Password" id="password" type="password" placeholder="Your password" />
      <Button className="w-full">Sign in with email</Button>
    </form>
  );
};

export default SignInForm;
