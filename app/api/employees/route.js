import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const employees = await prisma.user.findMany({
      where: {
        role: 1,
      },
      select: {
        id: true,
        email: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(employees);
  } catch (error) {
    return Response.json({ error: "Error fetching employees" }, { status: 500 });
  }
}
