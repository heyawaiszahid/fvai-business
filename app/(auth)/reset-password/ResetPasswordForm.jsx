"use client";

import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";

const ResetPasswordForm = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <form onSubmit={handleLogin} autoComplete="off" className="space-y-6 mb-6">
      <Input label="E-mail" id="email" type="email" placeholder="Your e-mail" />
      <Button className="w-full">Reset Password</Button>
    </form>
  );
};

export default ResetPasswordForm;
