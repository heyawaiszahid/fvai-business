import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function DELETE(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    await prisma.account.deleteMany({
      where: {
        userId: session.user.id,
      },
    });

    await prisma.session.deleteMany({
      where: {
        userId: session.user.id,
      },
    });

    await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    });

    return new Response(JSON.stringify({ message: "Account deleted successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to delete account" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
