"use client";

import AddNewChat from "@/Components/Icons/AddNewChat";
import Settings from "@/Components/Icons/Settings";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import Modal from "@/Components/UI/Modal";
import Typography from "@/Components/UI/Typography";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Actions() {
  const [projectName, setProjectName] = useState("");
  const [chatSubject, setChatSubject] = useState("");
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    type: "", // 'project', 'chat', or 'choice'
  });
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const closeModal = () => {
    setModal({ isOpen: false, title: "", type: "" });
    setProjectName("");
    setChatSubject("");
    setError("");
    setCreating(false);
  };

  const createConversation = async (type) => {
    setCreating(true);
    setError("");

    try {
      const payload = {
        type,
        ...(type === "project" ? { title: projectName } : { description: chatSubject }),
      };

      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create conversation");
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
      case "project":
        return (
          <div>
            <Typography size="body2" className="font-semibold mb-2">
              Give your new project a name
            </Typography>
            <Input
              placeholder="e.g., Project Ember"
              className="mb-6"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <Button
              className="w-full mb-2 py-3"
              onClick={() => createConversation("project")}
              disabled={!projectName.trim() || creating}
            >
              Start new project
            </Button>
          </div>
        );
      case "chat":
        return (
          <div>
            <Typography size="body2" className="font-semibold mb-2">
              What would you like to chat about?
            </Typography>
            <Input
              placeholder="Let's chat"
              className="mb-6"
              value={chatSubject}
              onChange={(e) => setChatSubject(e.target.value)}
            />
            <Button
              className="w-full mb-2 py-3"
              onClick={() => createConversation("chat")}
              disabled={!chatSubject.trim() || creating}
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
            <Button
              className="py-2 px-6 items-center mb-4"
              onClick={() =>
                setModal({
                  isOpen: true,
                  title: "Create new project",
                  type: "project",
                })
              }
            >
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
      default:
        return null;
    }
  };

  return (
    <>
      <div className="gap-6 hidden lg:flex">
        <Button
          className="py-2 px-6 items-center"
          onClick={() =>
            setModal({
              isOpen: true,
              title: "Create new project",
              type: "project",
            })
          }
        >
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
