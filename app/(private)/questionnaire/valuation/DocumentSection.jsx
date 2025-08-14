"use client";

import Delete from "@/Components/Icons/Delete";
import FileUpload from "@/Components/Icons/FileUpload";
import Link from "@/Components/Icons/Link";
import Box from "@/Components/UI/Box";
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
  files = [],
  savedFileUrls = [],
  onDrop,
  onDelete,
  isLast = false,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ACCEPTED_FORMATS,
    multiple: true,
  });

  return (
    <div
      className={`border-b-[2px] lg:border-b-0 ${
        isLast ? "border-transparent" : "border-light-blue-gray pb-6 lg:pb-0 mb-6 lg:mb-0"
      } lg:border-r-[2px] lg:px-6 lg:flex-1 lg:flex lg:flex-col lg:items-center`}
    >
      <Switch
        isActive={isActive}
        onToggle={() => {
          if (isActive) toggle(name, true);
          else toggle(name, false);
        }}
        disabled={savedFileUrls.length > 0}
      >
        <Typography size="h5">{label}</Typography>
        <Typography size="body2">{subtitle}</Typography>
      </Switch>

      {/* Uploaded Files */}
      {savedFileUrls.length > 0 && (
        <div className="mt-6 w-full">
          {savedFileUrls.map((file, index) => (
            <div
              key={`saved-${index}`}
              className="bg-background rounded-[10px] border-[1px] border-input-field p-3 mt-2 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Link />
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-main hover:underline flex-1"
                >
                  <Typography size="body2" className="max-w-[200px] truncate">
                    {file.originalName}
                  </Typography>
                </a>
              </div>
              <Typography className="!text-[11px] text-pale-blue">Uploaded</Typography>
            </div>
          ))}
        </div>
      )}

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="mt-6 w-full">
          {files.map((file, index) => (
            <div
              key={`selected-${index}`}
              className="bg-background rounded-[10px] border-[1px] border-input-field p-3 mt-2 flex flex-col"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Typography size="body2" className="font-medium max-w-[200px] truncate">
                    {file.name}
                  </Typography>
                  <Typography className="!text-[11px] text-pale-blue">{formatFileSize(file.size)}</Typography>
                </div>
                <button
                  className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
                  onClick={() => onDelete(name, index)}
                >
                  <Delete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Box */}
      {isActive && (
        <div {...getRootProps()} className="mt-4 w-full">
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
