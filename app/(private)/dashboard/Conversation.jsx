"use client";

import AddPeople from "@/Components/Icons/AddPeople";
import Back from "@/Components/Icons/Back";
import GetStartedillustration from "@/Components/Icons/GetStartedillustration";
import Button from "@/Components/UI/Button";
import Input from "@/Components/UI/Input";
import Modal from "@/Components/UI/Modal";
import TextArea from "@/Components/UI/Textarea";
import Typography from "@/Components/UI/Typography";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Chat from "./Chat";
import EmployeesList from "./EmployeesList";
import Status from "./Status";
import Preview from "@/Components/Icons/Preview";

export default function Conversation({ conversation, onBackClick, role }) {
  const router = useRouter();
  const [assignedEmployee, setAssignedEmployee] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    content: null,
  });
  const questionnaireId = conversation?.questionnaire?.id || null;

  useEffect(() => {
    setAssignedEmployee(conversation?.assignedTo || null);
  }, [conversation?.assignedTo?.id]);

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleAssign = async (employee) => {
    setAssignedEmployee(employee);
    closeModal();
    const toastId = toast.loading("Assigning conversation...");

    try {
      const response = await fetch(`/api/conversations/${conversation.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assignedToId: employee.id }),
      });

      if (!response.ok) throw new Error("Assignment failed");

      toast.update(toastId, {
        render: "Assignment successful!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      if (!conversation?.assignedToId) onBackClick();
      router.refresh();
    } catch (error) {
      setAssignedEmployee(conversation?.assignedTo || null);
      toast.update(toastId, {
        render: error.message || "Assignment failed",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
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

  const assignEmployee = () => {
    setModal({
      isOpen: true,
      title: "Add/remove employee",
      content: (
        <div>
          <EmployeesList onAssign={handleAssign} isAssignDisabled={false} assignedEmployeeId={assignedEmployee?.id} />
          <div className="flex justify-center">
            <button onClick={closeModal} className="text-main underline font-medium cursor-pointer">
              Close & Go Back
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
          <div className="flex flex-col gap-6 lg:flex-row px-0 lg:pl-4 lg:pr-6 pt-4 pb-1 lg:py-3 border-b-[2px] lg:border-b-[1px] border-input-field justify-between">
            <div className="flex items-center gap-2">
              <button className="cursor-pointer w-[24px] flex lg:justify-center" onClick={onBackClick}>
                <Back />
              </button>
              <div className="lg:max-w-[700px]">
                <Typography size="h5" className="font-semibold cursor-default line-clamp-1">
                  Project [<span className="capitalize">{conversation.title ?? "Untitled"}</span>]
                </Typography>
                {role === 2 && assignedEmployee && (
                  <Typography size="body2" className="font-medium cursor-default">
                    Employee: {assignedEmployee.email}
                  </Typography>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between gap-6 min-h-[44px]">
              <Status key={conversation.id} role={role} conversation={conversation} />
              {role === 0 && (
                <Button variant="light" className="py-2 px-2" onClick={addNewMember}>
                  <AddPeople />
                </Button>
              )}
              {role === 2 && (
                <Button variant="light" className="py-2 px-2" onClick={assignEmployee}>
                  <AddPeople />
                </Button>
              )}
              <Button
                href={`/questionnaire/valuation?qid=${questionnaireId}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                className="py-2 px-2"
                disabled={questionnaireId === null}
              >
                <Preview />
              </Button>
            </div>
          </div>
          <div className="h-[400px] lg:h-[600px] lg:shadow-md">
            <Chat conversationId={conversation.id} />
          </div>
        </div>
      ) : (
        <div className="h-[669px] overflow-y-scroll shadow-md">
          {role === 0 && (
            <div className="h-full flex flex-col items-center justify-center gap-6">
              <GetStartedillustration />
              <Typography size="h2" className="text-center">
                Start a new valuation project
              </Typography>
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
