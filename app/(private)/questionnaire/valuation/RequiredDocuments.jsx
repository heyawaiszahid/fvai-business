"use client";

import Button from "@/Components/UI/Button";
import Modal from "@/Components/UI/Modal";
import Typography from "@/Components/UI/Typography";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ButtonUploadLater from "./ButtonUploadLater";
import DocumentSection from "./DocumentSection";

const RequiredDocuments = () => {
  const [activeSwitches, setActiveSwitches] = useState({
    financials: false,
    management: false,
    forecast: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    financials: null,
    management: null,
    forecast: null,
  });

  const [isUploadEnabled, setIsUploadEnabled] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    status: null,
    title: "",
    message: "",
    buttonText: "",
  });
  const router = useRouter();

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    if (modalState.status === "success") {
      router.push("/");
    }
  };

  useEffect(() => {
    const hasAnyFile = Object.values(uploadedFiles).some((file) => file !== null);
    setIsUploadEnabled(hasAnyFile);
  }, [uploadedFiles]);

  const toggleSwitch = (name, turningOff = false) => {
    setActiveSwitches((prev) => {
      const newState = { ...prev, [name]: !prev[name] };
      return newState;
    });
    if (turningOff) {
      setUploadedFiles((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileUpload = (name) => (acceptedFiles) => {
    setUploadedFiles((prev) => ({ ...prev, [name]: acceptedFiles[0] }));
  };

  const handleDeleteFile = (name) => {
    setUploadedFiles((prev) => ({ ...prev, [name]: null }));
  };

  const handleUploadNow = async () => {
    setIsUploading(true);
    const filesToUpload = Object.entries(uploadedFiles).filter(([_, file]) => file !== null);

    try {
      for (const [docType, file] of filesToUpload) {
        const res = await fetch("/api/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName: file.name, fileType: file.type }),
        });
        const { uploadURL, key } = await res.json();
        const s3Res = await fetch(uploadURL, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });
        if (!s3Res.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }
        // console.log(`Uploaded ${file.name} to S3: ${key}`);
      }
      setModalState({
        isOpen: true,
        status: "success",
        title: "Upload Successful!",
        message: "All files have been successfully uploaded.",
        buttonText: "Close and Go Back",
      });
    } catch (error) {
      setModalState({
        isOpen: true,
        status: "error",
        title: "Upload Failed",
        message: error.message || "There was an error uploading your files. Please try again.",
        buttonText: "Try Again",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <section className="mb-14 lg:bg-white/70 lg:pb-8">
        <div className="bg-white/70 p-4 lg:p-12 mb-4">
          <Typography size="h4" lg="h3" className="mb-8 lg:text-center">
            Required Documents
          </Typography>

          <div className="flex flex-col lg:flex-row lg:justify-center lg:max-w-[1100px] lg:mx-auto">
            <DocumentSection
              name="financials"
              label="Historical Financials"
              subtitle="(FY21, FY22, FY23)"
              isActive={activeSwitches.financials}
              toggle={toggleSwitch}
              file={uploadedFiles.financials}
              onDrop={handleFileUpload("financials")}
              onDelete={handleDeleteFile}
            />

            <DocumentSection
              name="management"
              label="Management Accounts"
              subtitle="(up to Valuation Date)"
              isActive={activeSwitches.management}
              toggle={toggleSwitch}
              file={uploadedFiles.management}
              onDrop={handleFileUpload("management")}
              onDelete={handleDeleteFile}
            />

            <DocumentSection
              name="forecast"
              label="5-Year Forecast"
              subtitle="(if DCF is used)"
              isActive={activeSwitches.forecast}
              toggle={toggleSwitch}
              file={uploadedFiles.forecast}
              onDrop={handleFileUpload("forecast")}
              onDelete={handleDeleteFile}
              isLast={true}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-end lg:max-w-[1100px] lg:mx-auto">
          <div className="px-4 mb-6">
            <Button
              className="w-full lg:w-fit bg-main border-main disabled:bg-pale-blue disabled:border-pale-blue"
              disabled={!isUploadEnabled || isUploading}
              onClick={handleUploadNow}
            >
              {isUploading ? "Uploading Documents..." : "Upload Documents Now"}
            </Button>
          </div>
          <ButtonUploadLater />
        </div>
      </section>

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

export default RequiredDocuments;
