"use client";

import Done from "@/Components/Icons/Done";
import Button from "@/Components/UI/Button";
import Modal from "@/Components/UI/Modal";
import Typography from "@/Components/UI/Typography";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

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
  const requestInProgress = useRef(false);
  const router = useRouter();

  const closeModal = () => {
    if (requestInProgress.current) {
      requestInProgress.current = false;
    }
    setModalState((prev) => ({ ...prev, isOpen: false }));
    setGenerating(false);
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
    if (requestInProgress.current) return;

    setGenerating(true);
    requestInProgress.current = true;

    setModalState({
      isOpen: true,
      status: "loading",
      title: "Creating Your Engagement Letter",
      message: "We're preparing your customized engagement letter. This may take a minute or two.",
    });

    try {
      const answers = JSON.parse(localStorage.getItem("answers") || "{}");
      const result = JSON.parse(localStorage.getItem("result") || "{}");
      const entities = JSON.parse(localStorage.getItem("entities") || "{}");

      const response = await fetch("/api/engagement-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers, result, entities }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Server responded with an error");
      }

      const resultData = await response.json();

      if (!resultData.content) {
        throw new Error("No content received from server");
      }

      if (requestInProgress.current) {
        setContent(resultData.content);
        setModalState({
          isOpen: true,
          status: "success",
          title: "Your Letter Is Ready!",
          message: "Your engagement letter has been successfully generated and is ready for download.",
          buttonText: "Download & Go to Next Step",
        });
      }
    } catch (error) {
      if (requestInProgress.current) {
        setModalState({
          isOpen: true,
          status: "error",
          title: "Something Went Wrong",
          message: error.message,
          buttonText: "Try again",
        });
      }
    } finally {
      setGenerating(false);
      requestInProgress.current = false;
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
          <div>Confirm & Generate Engagement Letter</div>
        </div>
      </Button>

      <Modal isOpen={modalState.isOpen} onClose={closeModal} className="text-center">
        <Typography size="h4" className="mb-6">
          {modalState.title}
        </Typography>
        <Typography size="body2" className="mb-6 max-w-[576px] mx-auto">
          {modalState.message}
        </Typography>

        {modalState.status === "loading" && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4169E1]"></div>
          </div>
        )}

        {modalState.status === "success" && (
          <Button
            onClick={() => {
              downloadDocFile(content);
              router.push("/dashboard");
            }}
            className="text-main font-medium cursor-pointer"
          >
            {modalState.buttonText}
          </Button>
        )}

        {modalState.status === "error" && (
          <button onClick={() => generateLetter()} className="text-main text-underline font-medium cursor-pointer">
            {modalState.buttonText}
          </button>
        )}
      </Modal>
    </>
  );
};

export default ButtonGenerateLetter;
