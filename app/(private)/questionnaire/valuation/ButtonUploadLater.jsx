"use client";

import Info from "@/Components/Icons/Info";
import Button from "@/Components/UI/Button";
import Modal from "@/Components/UI/Modal";
import Typography from "@/Components/UI/Typography";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

const ButtonUploadLater = ({ className, disabled }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    tippy("#info", {
      theme: "custom",
      content: "We'll send a link to your email so you can upload the files later from your desktop.",
    });
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/dashboard");
  };

  return (
    <div className={`flex items-start justify-center gap-2 ${className}`}>
      <Button variant="outline" className="px-8" onClick={openModal} disabled={disabled}>
        Upload Later
      </Button>
      <button id="info" disabled={disabled} className="disabled:opacity-50">
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
