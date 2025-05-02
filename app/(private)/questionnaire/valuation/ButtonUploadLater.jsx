"use client";

import Info from "@/Components/Icons/Info";
import Button from "@/Components/UI/Button";
import { useEffect } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

const ButtonUploadLater = ({ className }) => {
  useEffect(() => {
    tippy("#info", {
      theme: "custom",
      content: "We'll send a link to your email so you can upload the files later from your desktop.",
    });
  }, []);

  return (
    <div className={`flex items-start justify-center gap-2 ${className}`}>
      <Button variant="outline">Upload Later</Button>
      <button id="info">
        <Info />
      </button>
    </div>
  );
};

export default ButtonUploadLater;
