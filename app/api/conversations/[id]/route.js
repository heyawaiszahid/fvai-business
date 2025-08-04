import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const { status, assignedToId } = await request.json();

  try {
    const updateData = {};

    if (status !== undefined) {
      updateData.status = status;
    }

    if (assignedToId !== undefined) {
      updateData.assignedToId = assignedToId;
    }

    const conversation = await prisma.conversation.update({
      where: { id },
      data: updateData,
    });

    return Response.json(conversation);
  } catch (error) {
    return Response.json({ error: "Error updating conversation status" }, { status: 500 });
  }
}
