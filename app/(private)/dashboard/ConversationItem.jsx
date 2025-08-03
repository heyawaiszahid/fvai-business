"use client";

import Avatar from "@/Components/Icons/Avatar";
import Typography from "@/Components/UI/Typography";

export default function ConversationItem({ conversation, isSelected, onClick }) {
  const updatedAt = new Date(conversation.updatedAt);
  const updatedDate = updatedAt.toLocaleDateString("en-US", {
    dateStyle: "medium",
  });
  const updatedTime = updatedAt.toLocaleTimeString("en-US", {
    timeStyle: "short",
  });

  return (
    <div
      className={`flex gap-4 lg:px-4 px-2 py-2 cursor-pointer hover:bg-light-blue group cursor-default hover:text-white transition-all ${
        isSelected ? "bg-light-blue text-white" : ""
      }`}
      onClick={onClick}
    >
      <div className="w-[64px] h-[64px] rounded-[10px] overflow-hidden">
        <Avatar />
      </div>
      <div className="flex-1 flex justify-between">
        <div className="flex flex-col">
          <Typography size="body2" className="font-semibold capitalize">
            {conversation.type === "project" ? conversation.title : conversation.description}
          </Typography>
          <Typography size="body2" className="font-semibold">
            {updatedDate}
          </Typography>
        </div>
        <Typography
          className={`font-semibold !text-[10px] !leading-normal group-hover:text-white ${isSelected ? "text-white" : "text-pale-blue"}`}
        >
          {updatedTime}
        </Typography>
      </div>
    </div>
  );
}
