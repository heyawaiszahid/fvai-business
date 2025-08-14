"use client";

import { useState, useEffect } from "react";
import AdminTabs from "./AdminTabs";
import Conversation from "./Conversation";
import ConversationList from "./ConversationList";

export default function ConversationView({
  conversations,
  unassignedConversations = [],
  assignedConversations = [],
  role,
  onConversationSelect,
  initialSelectedConversation,
}) {
  const [selectedConversation, setSelectedConversation] = useState(initialSelectedConversation || null);
  const [selectedTab, setSelectedTab] = useState("unassigned");

  useEffect(() => {
    if (initialSelectedConversation) {
      setSelectedConversation(initialSelectedConversation);
    }
  }, [initialSelectedConversation]);

  const handleBackClick = () => {
    setSelectedConversation(null);
    onConversationSelect?.(null);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSelectedConversation(null);
    onConversationSelect?.(null);
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    onConversationSelect?.(conversation);

    if (window.innerWidth < 768) {
      window.scrollTo(0, 0);
    }
  };

  const displayedConversations =
    role === 2 ? (selectedTab === "unassigned" ? unassignedConversations : assignedConversations) : conversations;

  return (
    <>
      {role === 2 && (
        <div className={`${selectedConversation ? "hidden lg:block" : "block"}`}>
          <AdminTabs
            unassignedCount={unassignedConversations.length}
            assignedCount={assignedConversations.length}
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />
        </div>
      )}
      <div className="lg:bg-[#f5f7fd] lg:border-[1px] border-input-field rounded-tl-[20px] rounded-tr-[20px]">
        <div className="flex flex-col lg:flex-row">
          <div className={`${selectedConversation ? "hidden lg:block" : "block"} flex-1 lg:max-w-[315px]`}>
            <ConversationList
              conversations={displayedConversations}
              onSelectConversation={handleSelectConversation}
              selectedConversation={selectedConversation}
            />
          </div>
          <div
            className={`${selectedConversation ? "block" : "hidden lg:block"} flex-1 lg:border-l-[1px] border-input-field`}
          >
            <Conversation conversation={selectedConversation} onBackClick={handleBackClick} role={role} />
          </div>
        </div>
      </div>
    </>
  );
}
