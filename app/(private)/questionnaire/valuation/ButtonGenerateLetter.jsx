"use client";

import Done from "@/Components/Icons/Done";
import Button from "@/Components/UI/Button";
import Modal from "@/Components/UI/Modal";
import Typography from "@/Components/UI/Typography";
import { useState } from "react";

const ButtonGenerateLetter = () => {
  const [generating, setGenerating] = useState(false);
  const [content, setContent] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    status: null,
    title: "",
    message: "",
    buttonText: "",
  });

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    if (modalState.status === "error") {
      generateLetter();
    }
  };

  const downloadDocFile = async (content) => {
    const { Document, Paragraph, TextRun, Packer } = await import("docx");

    const doc = new Document({
      sections: [
        {
          children: content.split("\n").map((text) => new Paragraph({ children: [new TextRun(text)] })),
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Engagement_Letter_${new Date().toISOString().split("T")[0]}.docx`;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  const generateLetter = async () => {
    if (content) {
      downloadDocFile(content);
      return;
    }

    setGenerating(true);

    const data = {
      answers: JSON.parse(localStorage.getItem("answers")),
      result: JSON.parse(localStorage.getItem("result")),
      entities: JSON.parse(localStorage.getItem("entities")),
    };

    try {
      const response = await fetch("/api/letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate letter");
      }

      const result = await response.json();
      setContent(result.content);
    } catch (error) {
      setModalState({
        isOpen: true,
        status: "error",
        title: "Failed to Generate Engagement Letter",
        message: error.message || "Something went wrong. Please try again",
        buttonText: "Try Again",
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="border-white text-white !text-left !text-[20px] !font-bold mb-4 lg:mb-0"
        onClick={generateLetter}
        disabled={generating}
      >
        <div className="flex items-center justify-center gap-4 px-3">
          <Done className="w-4 h-4 shrink-0" />
          <div>
            {content
              ? "Download"
              : generating
                ? "Generating Engagement Letter..."
                : "Confirm & Generate Engagement Letter"}
          </div>
        </div>
      </Button>

      <Modal isOpen={modalState.isOpen} onClose={closeModal} className="text-center">
        <Typography size="h4" className="mb-6">
          {modalState.title}
        </Typography>
        <Typography size="body2" className="mb-6 max-w-[576px] mx-auto">
          {modalState.message}
        </Typography>
        <button onClick={closeModal} className="text-main underline font-medium cursor-pointer">
          {modalState.buttonText}
        </button>
      </Modal>
    </>
  );
};

export default ButtonGenerateLetter;
