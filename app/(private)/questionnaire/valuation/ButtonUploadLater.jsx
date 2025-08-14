"use client";

import Info from "@/Components/Icons/Info";
import Button from "@/Components/UI/Button";
import Modal from "@/Components/UI/Modal";
import Typography from "@/Components/UI/Typography";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

const ButtonUploadLater = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    tippy("#info", {
      theme: "custom",
      content: "We'll send a link to your email so you can upload the files later from your desktop.",
    });
  }, []);

  const sendUploadLaterEmail = async () => {
    const toastId = toast.loading("Sending upload later link...");
    setIsLoading(true);

    try {
      const response = await fetch(`/api/upload-later-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uploadLink: window.location.href,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email.");
      }

      toast.dismiss();
      setIsModalOpen(true);
    } catch (error) {
      setIsLoading(false);
      toast.update(toastId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`flex items-start justify-center gap-2 ${className}`}>
      <Button variant="outline" className="px-8" onClick={sendUploadLaterEmail} disabled={isLoading}>
        Upload Later
      </Button>
      <button id="info" className="disabled:opacity-50" disabled={isLoading}>
        <Info />
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal} className="text-center">
        <Typography size="h4" className="mb-6">
          Confirmation
        </Typography>
        <Typography size="body2" className="mb-6 max-w-[576px] mx-auto">
          We've emailed you a secure link to upload your documents from your desktop when you're ready.
        </Typography>
        <button onClick={closeModal} className="text-main underline font-medium cursor-pointer">
          Close and Go Back
        </button>
      </Modal>
    </div>
  );
};

export default ButtonUploadLater;
