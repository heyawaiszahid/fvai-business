"use client";

import Button from "@/Components/UI/Button";
import Typography from "@/Components/UI/Typography";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ButtonUploadLater from "./ButtonUploadLater";
import DocumentSection from "./DocumentSection";

const RequiredDocuments = ({ id, selectedDocuments }) => {
  const [activeSwitches, setActiveSwitches] = useState({
    financials: false,
    management: false,
    forecast: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    financials: [],
    management: [],
    forecast: [],
  });

  const [savedFileUrls, setSavedFileUrls] = useState({
    financials: [],
    management: [],
    forecast: [],
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

  useEffect(() => {
    if (selectedDocuments) {
      const parsedDocuments = JSON.parse(selectedDocuments);

      setSavedFileUrls({
        financials: parsedDocuments.financials || [],
        management: parsedDocuments.management || [],
        forecast: parsedDocuments.forecast || [],
      });

      setActiveSwitches({
        financials: parsedDocuments.financials?.length > 0 || false,
        management: parsedDocuments.management?.length > 0 || false,
        forecast: parsedDocuments.forecast?.length > 0 || false,
      });
    }
  }, [selectedDocuments]);

  useEffect(() => {
    const hasAnyFile = Object.values(uploadedFiles).some((files) => files.length > 0);
    setIsUploadEnabled(hasAnyFile);
  }, [uploadedFiles]);

  const toggleSwitch = (name, turningOff = false) => {
    setActiveSwitches((prev) => {
      const newState = { ...prev, [name]: !prev[name] };
      return newState;
    });

    if (turningOff) {
      setUploadedFiles((prev) => ({ ...prev, [name]: [] }));
      setSavedFileUrls((prev) => ({ ...prev, [name]: [] }));
    }
  };

  const handleFileUpload = (name) => (acceptedFiles) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [name]: [...prev[name], ...acceptedFiles],
    }));
  };

  const handleDeleteFile = (name, index) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [name]: prev[name].filter((_, i) => i !== index),
    }));
  };

  const handleUploadNow = async () => {
    const toastId = toast.loading("Uploading files...");
    setIsUploading(true);

    const filesToUpload = Object.entries(uploadedFiles)
      .filter(([_, files]) => files.length > 0)
      .flatMap(([docType, files]) => files.map((file) => ({ docType, file })));

    try {
      const newUrls = { ...savedFileUrls };

      for (const { docType, file } of filesToUpload) {
        const res = await fetch("/api/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName: file.name, fileType: file.type }),
        });

        const { uploadURL, publicUrl } = await res.json();

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

        newUrls[docType] = [
          ...(newUrls[docType] || []),
          {
            url: publicUrl,
            originalName: file.name,
          },
        ];
      }

      const saveRes = await fetch(`/api/questionnaire/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedDocuments: newUrls }),
      });

      if (!saveRes.ok) {
        throw new Error("Failed to save to database");
      }

      setSavedFileUrls(newUrls);
      setUploadedFiles({
        financials: [],
        management: [],
        forecast: [],
      });

      toast.update(toastId, {
        render: "All files have been successfully uploaded.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "There was an error uploading your files. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="mb-14 lg:bg-white/70 lg:pb-8">
      <div className="bg-white/70 p-4 lg:p-12 mb-4">
        <Typography size="h4" lg="h3" className="mb-8 lg:text-center">
          Required Documents
        </Typography>

        <div
          className={`flex flex-col lg:flex-row lg:justify-center lg:max-w-[1100px] lg:mx-auto ${isUploading ? "opacity-30 pointer-events-none" : ""}`}
        >
          <DocumentSection
            name="financials"
            label="Historical Financials"
            subtitle="(FY21, FY22, FY23)"
            isActive={activeSwitches.financials}
            toggle={toggleSwitch}
            files={uploadedFiles.financials}
            savedFileUrls={savedFileUrls.financials}
            onDrop={handleFileUpload("financials")}
            onDelete={handleDeleteFile}
          />

          <DocumentSection
            name="management"
            label="Management Accounts"
            subtitle="(up to Valuation Date)"
            isActive={activeSwitches.management}
            toggle={toggleSwitch}
            files={uploadedFiles.management}
            savedFileUrls={savedFileUrls.management}
            onDrop={handleFileUpload("management")}
            onDelete={handleDeleteFile}
          />

          <DocumentSection
            name="forecast"
            label="5-Year Forecast"
            subtitle="(if DCF is used)"
            isActive={activeSwitches.forecast}
            toggle={toggleSwitch}
            files={uploadedFiles.forecast}
            savedFileUrls={savedFileUrls.forecast}
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
  );
};

export default RequiredDocuments;
