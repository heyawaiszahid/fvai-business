"use client";

import Settings from "@/Components/Icons/Settings";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import Modal from "@/Components/UI/Modal";
import Typography from "@/Components/UI/Typography";
import { useState } from "react";

const Actions = () => {
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    content: null,
  });

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  const createNewProject = () => {
    setModal({
      isOpen: true,
      title: "Create new project",
      content: (
        <div>
          <Typography size="body2" className="font-semibold mb-2">
            Give your new project a name
          </Typography>
          <Input placeholder="e.g., Project Ember" className="mb-6" />
          <Button className="w-full mb-2 py-3">Start new project</Button>
        </div>
      ),
    });
  };

  const createNewChat = () => {
    setModal({
      isOpen: true,
      title: "Create new chat",
      content: (
        <div>
          <Typography size="body2" className="font-semibold mb-2">
            What would you like to chat about? (Give your chat a subject so we can route it correctly)
          </Typography>
          <Input placeholder="Let's chat" className="mb-6" />
          <Button className="w-full mb-2 py-3">Start Chat</Button>
        </div>
      ),
    });
  };

  return (
    <>
      <div className="flex gap-6">
        <Button className="py-2 px-6 items-center" onClick={createNewProject}>
          +Create new project
        </Button>
        <Button variant="outline" className="py-2 px-6 items-center" onClick={createNewChat}>
          +Create new chat
        </Button>
        <Button variant="light" className="py-2 px-2">
          <Settings />
        </Button>
      </div>

      <Modal isOpen={modal.isOpen} onClose={closeModal}>
        <Typography size="h4" className="mb-6 text-center">
          {modal.title}
        </Typography>
        {modal.content}
      </Modal>
    </>
  );
};

export default Actions;
