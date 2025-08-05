"use client";

import Delete from "@/Components/Icons/Delete";
import FileUpload from "@/Components/Icons/FileUpload";
import Box from "@/Components/UI/Box";
import Button from "@/Components/UI/Button";
import Switch from "@/Components/UI/Switch";
import Typography from "@/Components/UI/Typography";
import { useDropzone } from "react-dropzone";

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const ACCEPTED_FORMATS = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
};

const DocumentSection = ({
  name,
  label,
  subtitle,
  isActive,
  toggle,
  file,
  savedFileUrl = null,
  onDrop,
  onDelete,
  isLast = false,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ACCEPTED_FORMATS,
    multiple: false,
  });

  const hasSavedFile = !!savedFileUrl;

  return (
    <div
      className={`border-b-[2px] lg:border-b-0 ${isLast ? "border-transparent" : "border-light-blue-gray pb-6 lg:pb-0 mb-6 lg:mb-0"} lg:border-r-[2px] lg:px-6 lg:flex-1 lg:flex lg:flex-col lg:items-center`}
    >
      <Switch
        isActive={isActive}
        onToggle={() => {
          if (isActive) toggle(name, true);
          else toggle(name, false);
        }}
        disabled={hasSavedFile}
      >
        <Typography size="h5">{label}</Typography>
        <Typography size="body2">{subtitle}</Typography>
      </Switch>

      {file && (
        <div className="bg-background rounded-[10px] border-[1px] border-input-field py-2 px-4 mt-6 flex flex-col lg:w-full">
          <button className="self-end cursor-pointer" onClick={() => onDelete(name)}>
            <Delete />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <Typography size="body2" className="font-medium max-w-48 overflow-hidden">
              {file.name}
            </Typography>
            <Typography className="!text-[11px] text-pale-blue">{formatFileSize(file.size)}</Typography>
          </div>
        </div>
      )}

      {hasSavedFile && (
        <div className="mt-6">
          <Button href={savedFileUrl} target="blank" variant="outline">
            Download Document
          </Button>
        </div>
      )}

      {isActive && !file && !hasSavedFile && (
        <div {...getRootProps()} className="mt-4 lg:w-full">
          <input {...getInputProps()} />
          <Box className="border-[3px] border-main border-dashed flex flex-col items-center justify-center py-12 cursor-pointer">
            <FileUpload className="-mr-3 mb-4 lg:mb-0" />
            <Typography size="body2" className="font-semibold text-center hidden lg:block">
              Drag & Drop or
            </Typography>
            <Typography size="body2" className="text-main underline font-semibold text-center">
              Upload document
            </Typography>
            <Typography size="body2" className="text-pale-blue font-semibold text-center hidden lg:block">
              Suggested documentation: PDF, Word, etc
            </Typography>
          </Box>
        </div>
      )}
    </div>
  );
};

export default DocumentSection;
