"use client";

import { useState, useEffect } from "react";
import ConversationView from "./ConversationView";
import DashboardHeader from "./DashboardHeader";

export default function DashboardContent({ role, conversations, unassignedConversations, assignedConversations }) {
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    if (role === 2) {
      if (unassignedConversations?.length > 0) {
        setSelectedConversation(unassignedConversations[0]);
      }
    } else {
      if (conversations?.length > 0) {
        setSelectedConversation(conversations[0]);
      }
    }
  }, [role, conversations, unassignedConversations]);

  return (
    <>
      <DashboardHeader role={role} selectedConversation={selectedConversation} />
      <ConversationView
        conversations={conversations}
        unassignedConversations={unassignedConversations}
        assignedConversations={assignedConversations}
        role={role}
        onConversationSelect={setSelectedConversation}
        initialSelectedConversation={selectedConversation}
      />
    </>
  );
}
