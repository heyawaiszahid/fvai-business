"use client";

import Attach from "@/Components/Icons/Attach";
import Spinner from "@/Components/Icons/Spinner";
import Button from "@/Components/UI/Button";
import { useRef } from "react";

export default function AttachmentButton({ onFileSelect, isSending }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
    e.target.value = "";
  };

  return (
    <>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" disabled={isSending} />
      <Button variant="light" className="py-2 px-2" onClick={handleClick} disabled={isSending}>
        {isSending ? <Spinner size="sm" /> : <Attach />}
      </Button>
    </>
  );
}
