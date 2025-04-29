"use client";

import Typography from "@/Components/Typography";
import Box from "@/Components/UI/Box";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import { passwordResetSchema } from "@/schemas/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SettingsForm = ({ session }) => {
  const { user } = session;
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(passwordResetSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update password");
      }

      toast.success("Password updated successfully!");
      reset();
      router.refresh();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch("/api/auth/delete-account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete account");
      }

      toast.success("Account deleted successfully!");

      await signOut({ callbackUrl: "/" });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container lg:max-w-[767px] lg:max-auto">
      <Box p="6" className="mb-6">
        <Typography size="h5" className="mb-6">
          My Basic information
        </Typography>
        <Input label="E-mail" value={user.email} disabled className="mb-6" />
      </Box>

      {user.hasPassword && (
        <Box p="6" className="mb-6">
          <Typography size="h5" className="mb-6">
            Change Password
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Old Password"
              type="password"
              placeholder="Type password"
              className="mb-6"
              error={errors.oldPassword?.message}
              {...register("oldPassword")}
            />
            <Input
              label="New Password"
              type="password"
              placeholder="Type new password"
              className="mb-6"
              error={errors.newPassword?.message}
              {...register("newPassword")}
            />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Confirm new password"
              className="mb-6"
              error={errors.confirmNewPassword?.message}
              {...register("confirmNewPassword")}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </form>
        </Box>
      )}

      <Box p="6" className="mb-6">
        <Typography size="h5" className="mb-6">
          Your account
        </Typography>
        <button
          onClick={handleDeleteAccount}
          disabled={isDeleting}
          className="text-left text-red font-semibold cursor-pointer"
        >
          {isDeleting ? "Deleting..." : "Delete my account"}
        </button>
      </Box>
    </div>
  );
};

export default SettingsForm;
