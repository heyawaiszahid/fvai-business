import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sendUploadLaterEmail } from "@/emails/send";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { uploadLink } = await request.json();

    await sendUploadLaterEmail({
      email: session.user.email,
      uploadLink,
    });

    return NextResponse.json({
      message: "Upload link sent to your email.",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to send email." }, { status: 500 });
  }
}
