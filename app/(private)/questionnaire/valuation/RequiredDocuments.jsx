"use client";

import Typography from "@/Components/Typography";
import Button from "@/Components/UI/Button";
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

  return (
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
            disabled={!isUploadEnabled}
          >
            Upload Documents Now
          </Button>
        </div>
        <ButtonUploadLater />
      </div>
    </section>
  );
};

export default RequiredDocuments;
