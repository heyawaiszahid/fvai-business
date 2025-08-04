import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  try {
    const employee = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
        role: 1,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!employee) {
      return Response.json({ error: "Employee not found" }, { status: 404 });
    }

    return Response.json(employee);
  } catch (error) {
    return Response.json({ error: "Error fetching employee" }, { status: 500 });
  }
}
