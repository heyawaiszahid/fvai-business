"use client";

import Avatar from "@/Components/Icons/Avatar";
import StatusIcon from "@/Components/Icons/StatusIcon";
import Typography from "@/Components/UI/Typography";
import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";
import STATUS_CONFIG from "./status.json";

const formatUpdatedAt = (date) => {
  const updatedAt = new Date(date);
  if (isToday(updatedAt)) return format(updatedAt, "h:mm a");
  if (isYesterday(updatedAt)) return "Yesterday";
  return formatDistanceToNow(updatedAt, { addSuffix: true });
};

export default function ConversationItem({ conversation, isSelected, onClick }) {
  const createdAt = new Date(conversation.createdAt);
  const createdDate = format(createdAt, "MM/dd/yyyy");
  const updatedTime = formatUpdatedAt(conversation.updatedAt);

  return (
    <div
      className={`flex gap-4 lg:px-4 px-2 py-3 border-b-[1px] border-input-field bg-transparent cursor-pointer transition-colors ${
        isSelected ? "!bg-light-blue text-white" : "hover:bg-input-field"
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <div
          className="w-[56px] h-[56px] rounded-[10px] overflow-hidden border-[1px]"
          style={{ borderColor: STATUS_CONFIG[conversation.status].color }}
        >
          <Avatar bg="white" color="#6787E7" className="w-[56px] h-[56px]" />
        </div>
        <div className="absolute bottom-[-8px] right-[-8px]">
          <StatusIcon status={conversation.status} />
        </div>
      </div>
      <div className="flex-1 flex justify-between">
        <div className="flex flex-col">
          <Typography size="body2" className="font-semibold capitalize line-clamp-1">
            {conversation.type === "project" ? conversation.title : conversation.description}
          </Typography>
          <Typography size="body2" className="font-semibold">
            {createdDate}
          </Typography>
        </div>
        <Typography
          className={`shrink-0 pl-1 font-semibold !text-[10px] !leading-normal transition-colors ${isSelected ? "text-white" : "text-pale-blue"}`}
        >
          {updatedTime}
        </Typography>
      </div>
    </div>
  );
}
