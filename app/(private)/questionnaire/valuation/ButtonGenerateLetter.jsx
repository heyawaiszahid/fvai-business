"use client";

import Done from "@/Components/Icons/Done";
import Spinner from "@/Components/Icons/Spinner";
import Button from "@/Components/UI/Button";
import Modal from "@/Components/UI/Modal";
import Typography from "@/Components/UI/Typography";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const buildEntityData = (price, parsedSelectedEntities) => {
  const selected = [];
  let total = 0;

  for (const [key, isSelected] of Object.entries(parsedSelectedEntities)) {
    if (!isSelected) continue;

    const displayName =
      key === "mainTarget"
        ? "Main Target Entity"
        : key.startsWith("partial")
          ? `Significant Partial Entity ${key.replace("partial", "")}`
          : key;

    selected.push(displayName);
    total += key === "mainTarget" ? price.main : key.startsWith("partial") ? price.partial : 0;
  }

  return { price, selected, total };
};

const ButtonGenerateLetter = ({ id, price }) => {
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
      title: "Preparing Your Engagement Letter",
      message: "This may take up to 5 minutes.",
    });

    const response = await fetch(`/api/questionnaire/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error fetching questionnaire");
    }

    const questionnaire = await response.json();

    const { answers, results, selectedEntities } = questionnaire;

    const parsedAnswers = JSON.parse(answers);
    const parsedResults = JSON.parse(results);
    const parsedSelectedEntities = JSON.parse(selectedEntities);

    const entityData = buildEntityData(price, parsedSelectedEntities);

    try {
      const response = await fetch("/api/engagement-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: parsedAnswers, results: parsedResults, entityData }),
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
          message: "Review and download your engagement letter.",
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
          <div className="flex justify-center py-4">
            <Spinner />
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
