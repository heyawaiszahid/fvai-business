"use client";

import { useState } from "react";
import ConversationView from "./ConversationView";
import DashboardHeader from "./DashboardHeader";

export default function DashboardContent({ role, conversations, unassignedConversations, assignedConversations }) {
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <>
      <DashboardHeader role={role} selectedConversation={selectedConversation} />
      <ConversationView
        conversations={conversations}
        unassignedConversations={unassignedConversations}
        assignedConversations={assignedConversations}
        role={role}
        onConversationSelect={setSelectedConversation}
      />
    </>
  );
}
