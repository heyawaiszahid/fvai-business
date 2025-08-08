"use client";

import Attach from "@/Components/Icons/Attach";
import SendMessage from "@/Components/Icons/SendMessage";
import Spinner from "@/Components/Icons/Spinner";
import Button from "@/Components/UI/Button";
import Typography from "@/Components/UI/Typography";
import { formatRelativeDate } from "@/lib/formatRelativeDate";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

function Message({ message, isCurrentUser, showSender, showTimestamp }) {
  const senderName = isCurrentUser ? "You" : message.sender?.role === 1 ? "Valuation Expert" : "Client";

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
        <div
          className={`px-6 py-3 rounded-[10px] ${
            isCurrentUser ? "bg-input-field text-dark" : "bg-gradient text-white"
          }`}
          style={{ display: "inline-block" }}
        >
          <Typography size="body2">{message.content}</Typography>
        </div>
        {showTimestamp && (
          <Typography size="caption" className={`mt-1 text-pale-blue ${isCurrentUser ? "text-right" : "text-left"}`}>
            {formatRelativeDate(message.createdAt)}
          </Typography>
        )}
      </div>
    </div>
  );
}

export default function Chat({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const { data: session } = useSession();
  const currentUser = session?.user;
  const isAdmin = currentUser?.role === 2;
  const prevMessagesLengthRef = useRef(0);
  const isInitialMountRef = useRef(true);
  const latestMessageRef = useRef(null);

  useEffect(() => {
    if (!conversationId) return;

    setIsInitialLoading(true);
    setMessages([]);

    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages?conversationId=${conversationId}`);
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [conversationId]);

  useEffect(() => {
    const currentMessagesLength = messages.length;

    if (isInitialMountRef.current && currentMessagesLength > 0) {
      messagesEndRef.current?.scrollIntoView();
      isInitialMountRef.current = false;
    } else if (currentMessagesLength > prevMessagesLengthRef.current) {
      const lastMessage = messages[currentMessagesLength - 1];
      const isNewMessageFromCurrentUser = lastMessage?.senderId === currentUser?.id;

      if (isNewMessageFromCurrentUser) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      } else if (shouldScrollToBottom()) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }

    prevMessagesLengthRef.current = currentMessagesLength;
  }, [messages]);

  const shouldScrollToBottom = () => {
    const container = messagesEndRef.current?.parentElement;
    if (!container) return false;

    const distanceFromBottom = container.scrollHeight - (container.scrollTop + container.clientHeight);
    return distanceFromBottom < 200;
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !conversationId || isSending) return;

    const tempId = `temp-${Date.now()}`;
    const messageToSend = {
      content: newMessage,
      conversationId,
      senderId: currentUser.id,
    };

    const optimisticMessage = {
      ...messageToSend,
      id: tempId,
      createdAt: new Date(),
      sender: {
        id: currentUser.id,
        role: currentUser.role,
      },
    };

    latestMessageRef.current = optimisticMessage;
    setMessages((prev) => [...prev, optimisticMessage]);
    setNewMessage("");
    setIsSending(true);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageToSend),
      });

      if (!response.ok) throw new Error(await response.text());

      const savedMessage = await response.json();

      setMessages((prev) => {
        const newMessages = prev.map((msg) => (msg.id === tempId ? savedMessage : msg));
        if (!newMessages.some((msg) => msg.id === tempId || msg.id === savedMessage.id)) {
          return [...newMessages, savedMessage];
        }
        return newMessages;
      });
    } catch (error) {
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
      setNewMessage(newMessage);
    } finally {
      setIsSending(false);
    }
  };

  const groupedMessages = messages.reduce((acc, message, index) => {
    const prevMessage = messages[index - 1];
    if (prevMessage && prevMessage.senderId === message.senderId) {
      acc[acc.length - 1].push(message);
    } else {
      acc.push([message]);
    }
    return acc;
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto py-4 lg:px-6">
        {isInitialLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner size="lg" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-pale-blue">
            <Typography size="body2">No messages found. Send one to get started!</Typography>
          </div>
        ) : (
          <div className="space-y-1">
            {groupedMessages.map((group, groupIndex) =>
              group.map((message, messageIndex) => (
                <Message
                  key={message.id}
                  message={message}
                  isCurrentUser={message.senderId === currentUser?.id}
                  showSender={messageIndex === 0}
                  showTimestamp={messageIndex === group.length - 1}
                />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {!isAdmin && (
        <div className="bg-white px-6 py-2 flex items-center gap-4 lg:gap-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Your message..."
              className="w-full lg:px-4 py-4 placeholder:text-pale-blue text-[15px] outline-0"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
              disabled={isSending}
            />
          </div>
          <div className="shrink-0 flex gap-4 lg:gap-6">
            <Button variant="light" className="py-2 px-2">
              <Attach />
            </Button>
            <Button className="py-2 px-2" onClick={handleSendMessage} disabled={!newMessage.trim() || isSending}>
              <SendMessage />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
