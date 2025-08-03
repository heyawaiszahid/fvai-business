import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, title, description } = await request.json();

  try {
    const conversation = await prisma.conversation.create({
      data: {
        type,
        title: type === "project" ? title : null,
        description: type === "chat" ? description : null,
        createdById: session.user.id,
      },
      include: {
        createdBy: true,
      },
    });

    return Response.json(conversation, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Error creating conversation" }, { status: 500 });
  }
}

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [{ createdById: session.user.id }, { assignedToId: session.user.id }],
      },
      include: {
        createdBy: true,
        assignedTo: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(conversations);
  } catch (error) {
    return Response.json({ error: "Error fetching conversations" }, { status: 500 });
  }
}
