"use client";

import AddPeople from "@/Components/Icons/AddPeople";
import Back from "@/Components/Icons/Back";
import GetStartedillustration from "@/Components/Icons/GetStartedillustration";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import Modal from "@/Components/UI/Modal";
import TextArea from "@/Components/UI/Textarea";
import Typography from "@/Components/UI/Typography";
import { useState } from "react";
import Status from "./Status";

export default function Conversation({ conversation, onBackClick, role }) {
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    content: null,
  });

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  const addNewMember = () => {
    setModal({
      isOpen: true,
      title: "Add New Contact",
      content: (
        <div>
          <Typography size="body2" className="text-center mb-6">
            Add team members / people to the Project:
          </Typography>
          <Input placeholder="someone@example.com" className="mb-6" />
          <TextArea placeholder="Comment Box" rows="4" className="mb-10" />
          <Button className="w-full py-3 mb-6" onClick={sendInvite}>
            Send
          </Button>
          <div className="text-center">
            <button onClick={closeModal} className="text-main underline font-medium cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      ),
    });
  };

  const sendInvite = () => {
    setModal({
      isOpen: true,
      title: "Add New Contact",
      content: (
        <div>
          <Typography size="body2" className="text-center mb-6">
            An email invitation to join the Project has been sent.
          </Typography>
          <div className="text-center">
            <button onClick={closeModal} className="text-main underline font-medium cursor-pointer">
              Close and Go Back
            </button>
          </div>
        </div>
      ),
    });
  };

  return (
    <>
      {conversation ? (
        <div>
          <div className="flex pl-4 pr-6 py-3 border-b-[1px] border-input-field justify-between">
            <div className="flex items-center gap-2">
              <button className="cursor-pointer w-[24px] flex justify-center" onClick={onBackClick}>
                <Back />
              </button>
              <Typography size="h5" className="font-semibold cursor-default">
                Project [<span className="capitalize">{conversation.title ?? "TBD"}</span>]
              </Typography>
            </div>
            <div className="flex items-center gap-6">
              <Status key={conversation.id} role={role} conversation={conversation} />
              <Button variant="light" className="py-2 px-2" onClick={addNewMember}>
                <AddPeople />
              </Button>
            </div>
          </div>
          <div className="h-[600px] overflow-y-scroll shadow-md">
            <div className="p-4">hi</div>
          </div>
        </div>
      ) : (
        <div className="h-[669px] overflow-y-scroll shadow-md">
          {role !== 2 && (
            <div className="h-full flex flex-col items-center justify-center gap-6">
              <GetStartedillustration />
              <Typography size="h2">Start a new valuation project</Typography>
              <Button href="/questionnaire">Start Your Valuation Now</Button>
            </div>
          )}
        </div>
      )}

      <Modal isOpen={modal.isOpen} onClose={closeModal}>
        <Typography size="h4" className="mb-6 text-center">
          {modal.title}
        </Typography>
        {modal.content}
      </Modal>
    </>
  );
}
