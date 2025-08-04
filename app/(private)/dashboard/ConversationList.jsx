"use client";

import Input from "@/Components/UI/Input";
import { useState } from "react";
import ConversationItem from "./ConversationItem";

export default function ConversationList({ conversations, onSelectConversation, selectedConversation }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = conversations.filter((conversation) => {
    const searchText = conversation.type === "project" ? conversation.title : conversation.description;
    return searchText?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <div className="mb-6 lg:mb-0 lg:py-6 lg:px-4 border-b-[1px] border-input-field">
        <Input
          placeholder="Search"
          inputClassName="px-4 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="lg:h-[580px] lg:overflow-y-scroll">
        {filteredConversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            isSelected={selectedConversation?.id === conversation.id}
            onClick={() => onSelectConversation(conversation)}
          />
        ))}
      </div>
    </div>
  );
}
