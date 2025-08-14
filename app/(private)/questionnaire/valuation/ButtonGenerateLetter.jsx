"use client";

import Done from "@/Components/Icons/Done";
import Spinner from "@/Components/Icons/Spinner";
import Button from "@/Components/UI/Button";
import Modal from "@/Components/UI/Modal";
import Typography from "@/Components/UI/Typography";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const buildEntityData = (price, parsedSelectedEntities) => {
  return Object.entries(parsedSelectedEntities).reduce(
    (acc, [key, isSelected]) => {
      if (!isSelected) return acc;

      const displayName =
        key === "mainTarget"
          ? "Main Target Entity"
          : key.startsWith("partial")
            ? `Significant Partial Entity ${key.replace("partial", "")}`
            : key;

      return {
        selected: [...acc.selected, displayName],
        total: acc.total + (key === "mainTarget" ? price.main : price.partial),
        price: acc.price,
      };
    },
    { selected: [], total: 0, price }
  );
};

const ButtonGenerateLetter = ({ id, price }) => {
  const [generating, setGenerating] = useState(false);
  const [s3Url, setS3Url] = useState(null);
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
    requestInProgress.current = false;
    setModalState((prev) => ({ ...prev, isOpen: false }));
    setGenerating(false);
  };

  const uploadToS3 = async (content) => {
    const res = await fetch("/api/upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: `Engagement_Letter_${new Date().toISOString().split("T")[0]}.docx`,
        fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      }),
    });

    const { uploadURL, publicUrl } = await res.json();
    const { Document, Paragraph, TextRun, Packer } = await import("docx");

    const doc = new Document({
      sections: [
        {
          children: content.split("\n").map((text) => new Paragraph({ children: [new TextRun(text)] })),
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    await fetch(uploadURL, {
      method: "PUT",
      headers: { "Content-Type": blob.type },
      body: blob,
    });

    return publicUrl;
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

    try {
      const res = await fetch(`/api/questionnaire/${id}`);
      if (!res.ok) throw new Error("Error fetching questionnaire");

      const { answers, results, selectedEntities } = await res.json();
      const entityData = buildEntityData(price, JSON.parse(selectedEntities));

      const letterRes = await fetch("/api/engagement-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: JSON.parse(answers),
          results: JSON.parse(results),
          entityData,
        }),
      });

      if (!letterRes.ok) throw new Error("Error generating letter");

      const { content } = await letterRes.json();
      if (!content) throw new Error("No content received");

      const publicUrl = await uploadToS3(content);
      await fetch(`/api/questionnaire/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ engagementLetterUrl: publicUrl }),
      });

      setS3Url(publicUrl);
      setModalState({
        isOpen: true,
        status: "success",
        title: "Your Letter Is Ready!",
        message: "Review and download your engagement letter.",
        buttonText: "Download & Go to Next Step",
      });
    } catch (error) {
      setModalState({
        isOpen: true,
        status: "error",
        title: "Something Went Wrong",
        message: error.message,
        buttonText: "Try again",
      });
    } finally {
      setGenerating(false);
      requestInProgress.current = false;
    }
  };

  const handleDownloadAndNext = () => {
    if (s3Url) {
      const link = document.createElement("a");
      link.href = s3Url;
      link.download = s3Url.split("/").pop();
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    router.push("/dashboard");
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
          <Button onClick={handleDownloadAndNext} className="text-main font-medium cursor-pointer">
            {modalState.buttonText}
          </Button>
        )}

        {modalState.status === "error" && (
          <button onClick={generateLetter} className="text-main text-underline font-medium cursor-pointer">
            {modalState.buttonText}
          </button>
        )}
      </Modal>
    </>
  );
};

export default ButtonGenerateLetter;
