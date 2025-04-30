import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "No user found with this email address" }, { status: 404 });
    }

    if (!user.password) {
      return NextResponse.json({ error: "This account was not registered with email/password" }, { status: 400 });
    }

    const resetToken = randomBytes(32).toString("hex");

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry: new Date(Date.now() + 3600000),
      },
    });

    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    const { data, error } = await resend.emails.send({
      from: "noreply@fvai.app",
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset. Click the link below to set a new password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });

    if (error) {
      throw new Error("Failed to send reset email");
    }

    return NextResponse.json({
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to process password reset" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { password, token } = await request.json();

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return NextResponse.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to reset password" }, { status: 500 });
  }
}
