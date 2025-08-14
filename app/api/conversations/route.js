import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, title, message } = await request.json();

  try {
    const data = {
      type,
      title,
      createdById: session.user.id,
    };

    if (type === "project") {
      data.questionnaire = {
        create: {},
      };
    }

    if (type === "chat") {
      data.messages = {
        create: {
          content: message,
          senderId: session.user.id,
        },
      };
    }

    const conversation = await prisma.conversation.create({
      data,
      include: {
        createdBy: true,
        questionnaire: {
          select: {
            id: true,
          },
        },
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
