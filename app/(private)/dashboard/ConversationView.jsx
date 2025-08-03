"use client";

import { useState } from "react";
import AdminTabs from "./AdminTabs";
import Conversation from "./Conversation";
import ConversationList from "./ConversationList";

export default function ConversationView({
  conversations,
  unassignedConversations = [],
  assignedConversations = [],
  role,
}) {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedTab, setSelectedTab] = useState("unassigned");

  const handleBackClick = () => {
    setSelectedConversation(null);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSelectedConversation(null);
  };

  const displayedConversations =
    role === 2 ? (selectedTab === "unassigned" ? unassignedConversations : assignedConversations) : conversations;

  return (
    <>
      {role === 2 && (
        <AdminTabs
          unassignedCount={unassignedConversations.length}
          assignedCount={assignedConversations.length}
          selectedTab={selectedTab}
          onTabChange={handleTabChange}
        />
      )}
      <div className="lg:bg-[#f5f7fd] lg:border-[1px] border-input-field rounded-tl-[20px] rounded-tr-[20px]">
        <div className="flex">
          <div className="flex-1 lg:max-w-[315px]">
            <ConversationList
              conversations={displayedConversations}
              onSelectConversation={setSelectedConversation}
              selectedConversation={selectedConversation}
            />
          </div>
          <div className="hidden lg:block flex-1 border-l-[1px] border-input-field">
            <Conversation conversation={selectedConversation} onBackClick={handleBackClick} role={role} />
          </div>
        </div>
      </div>
    </>
  );
}
