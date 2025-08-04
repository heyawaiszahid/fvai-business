import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import DashboardContent from "./DashboardContent";

export const metadata = {
  title: "Dashboard - FVAI Business",
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role ?? 0;
  const userId = session?.user?.id;

  let conversations = [];
  let unassignedConversations = [];
  let assignedConversations = [];

  if (role === 0) {
    conversations = await prisma.conversation.findMany({
      where: { createdById: userId },
      include: { assignedTo: true },
      orderBy: { updatedAt: "desc" },
    });
  } else if (role === 1) {
    conversations = await prisma.conversation.findMany({
      where: { assignedToId: userId },
      include: { createdBy: true },
      orderBy: { updatedAt: "desc" },
    });
  } else if (role === 2) {
    const allConversations = await prisma.conversation.findMany({
      include: { createdBy: true, assignedTo: true },
      orderBy: { updatedAt: "desc" },
    });

    unassignedConversations = allConversations.filter((conv) => !conv.assignedToId);
    assignedConversations = allConversations.filter((conv) => conv.assignedToId);
    conversations = allConversations;
  }

  return (
    <div className="pt-4 lg:pt-14 pb-8 lg:pb-20">
      <div className="container">
        <DashboardContent
          role={role}
          conversations={conversations}
          unassignedConversations={unassignedConversations}
          assignedConversations={assignedConversations}
        />
      </div>
    </div>
  );
}
