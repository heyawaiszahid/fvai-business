import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Typography from "@/Components/UI/Typography";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import Actions from "./Actions";
import ConversationView from "./ConversationView";

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
      orderBy: { createdAt: "desc" },
    });
  } else if (role === 1) {
    conversations = await prisma.conversation.findMany({
      where: { assignedToId: userId },
      include: { createdBy: true },
      orderBy: { createdAt: "desc" },
    });
  } else if (role === 2) {
    const allConversations = await prisma.conversation.findMany({
      include: { createdBy: true, assignedTo: true },
      orderBy: { createdAt: "desc" },
    });

    unassignedConversations = allConversations.filter((conv) => !conv.assignedToId);
    assignedConversations = allConversations.filter((conv) => conv.assignedToId);
    conversations = allConversations;
  }

  return (
    <div className="pt-8 lg:pt-14 pb-8 lg:pb-20">
      <div className="container">
        {role !== 2 ? (
          <div className="px-2 lg:px-6 flex items-center justify-between mb-6">
            <Typography size="h5" className="font-semibold">
              My Dashboard
            </Typography>
            {role === 0 && <Actions />}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 mb-10">
            <Typography size="h5">Welcome, Admin</Typography>
            <Typography size="body2" className="max-w-[654px] text-center">
              Review and assign incoming valuation requests and chats to employees. Track ongoing cases and manage
              communications.
            </Typography>
          </div>
        )}

        <ConversationView
          conversations={conversations}
          unassignedConversations={unassignedConversations}
          assignedConversations={assignedConversations}
          role={role}
        />
      </div>
    </div>
  );
}
