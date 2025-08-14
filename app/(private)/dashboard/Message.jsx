"use client";

import Attachment from "@/Components/Icons/Attachment";
import Typography from "@/Components/UI/Typography";
import { formatRelativeDate } from "@/lib/formatRelativeDate";
import Link from "next/link";

export default function Message({ message, isCurrentUser, showSender, showTimestamp }) {
  const senderName = isCurrentUser ? "You" : message.sender?.role === 1 ? "Valuation Expert" : "Client";
  const isAttachment = message.content.startsWith("https://fvai-business.s3.ap-southeast-2.amazonaws.com/");

  return (
    <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
      <div className="mt-6 max-w-[450px]">
        {showSender && (
          <Typography
            size="body2"
            className={`mb-1 font-semibold ${isCurrentUser ? "text-right text-dark" : "text-left text-main"}`}
          >
            {senderName}
          </Typography>
        )}
        {isAttachment ? (
          <Link href={message.content} target="_blank">
            <Attachment />
          </Link>
        ) : (
          <div
            className={`px-6 py-3 rounded-[10px] ${
              isCurrentUser ? "bg-input-field text-dark" : "bg-gradient text-white"
            }`}
            style={{ display: "inline-block" }}
          >
            <Typography size="body2">{message.content}</Typography>
          </div>
        )}

        {showTimestamp && (
          <Typography size="caption" className={`mt-1 text-pale-blue ${isCurrentUser ? "text-right" : "text-left"}`}>
            {formatRelativeDate(message.createdAt)}
          </Typography>
        )}
      </div>
    </div>
  );
}
