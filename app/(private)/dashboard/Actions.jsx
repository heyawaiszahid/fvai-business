"use client";

import AddNewChat from "@/Components/Icons/AddNewChat";
import Settings from "@/Components/Icons/Settings";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import Modal from "@/Components/UI/Modal";
import Typography from "@/Components/UI/Typography";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Actions() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    type: "", // 'chat', or 'choice'
  });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const shouldOpenChat = searchParams?.get("chat") === "open";
    if (shouldOpenChat) {
      setModal({
        isOpen: true,
        title: "Create new chat",
        type: "chat",
      });
      router.replace("/dashboard");
    }
  }, [searchParams, router]);

  const closeModal = () => {
    setModal({ isOpen: false, title: "", type: "" });
    setMessage("");
    setError("");
    setCreating(false);
  };

  const createChat = async (type) => {
    setCreating(true);
    setError("");

    try {
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to start chat.");
      }

      router.refresh();
      closeModal();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setCreating(false);
    }
  };

  const renderModalContent = () => {
    switch (modal.type) {
      case "chat":
        return (
          <div>
            <Typography size="body2" className="font-semibold mb-2">
              What would you like to chat about?
            </Typography>
            <Input
              placeholder="Let's chat"
              className="mb-6"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              className="w-full mb-2 py-3"
              onClick={() => createChat("chat")}
              disabled={!message.trim() || creating}
            >
              Start Chat
            </Button>
          </div>
        );
      case "choice":
        return (
          <div className="flex flex-col">
            <Typography size="body2" className="text-center mb-6">
              Start a project or chat with our team
            </Typography>
            <Button href="/questionnaire" className="py-2 px-6 items-center mb-4">
              +Create new project
            </Button>
            <Button
              variant="outline"
              className="py-2 px-6 items-center mb-4"
              onClick={() =>
                setModal({
                  isOpen: true,
                  title: "Create new chat",
                  type: "chat",
                })
              }
            >
              +Create new chat
            </Button>
          </div>
        );
    }
  };

  return (
    <>
      <div className="gap-6 hidden lg:flex">
        <Button href="/questionnaire" className="py-2 px-6 items-center">
          +Create new project
        </Button>
        <Button
          variant="outline"
          className="py-2 px-6 items-center"
          onClick={() =>
            setModal({
              isOpen: true,
              title: "Create new chat",
              type: "chat",
            })
          }
        >
          +Create new chat
        </Button>
        <Button variant="light" className="py-2 px-2">
          <Settings />
        </Button>
      </div>

      <div className="gap-4 flex lg:hidden">
        <Button
          className="py-2 px-2"
          onClick={() =>
            setModal({
              isOpen: true,
              title: "Create New",
              type: "choice",
            })
          }
        >
          <AddNewChat />
        </Button>
        <Button variant="light" className="py-2 px-2">
          <Settings />
        </Button>
      </div>

      <Modal isOpen={modal.isOpen} onClose={closeModal}>
        <Typography size="h4" className="mb-6 text-center">
          {modal.title}
        </Typography>
        {renderModalContent()}
        {error && (
          <Typography size="body2" className="text-red font-semibold mt-2">
            {error}
          </Typography>
        )}
      </Modal>
    </>
  );
}
