"use client";

import DownArrow from "@/Components/Icons/DownArrow";
import StatusIcon from "@/Components/Icons/StatusIcon";
import Typography from "@/Components/UI/Typography";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import STATUS_CONFIG from "./status.json";

export default function Status({ role, conversation }) {
  const router = useRouter();
  const { id, status } = conversation;
  const [isOpen, setIsOpen] = useState(false);
  const [displayStatus, setDisplayStatus] = useState(status);
  const statusOptions = Object.keys(STATUS_CONFIG);
  const currentConfig = STATUS_CONFIG[displayStatus];

  useEffect(() => {
    setDisplayStatus(status);
  }, [status]);

  const updateStatus = async (newStatus) => {
    const toastId = toast.loading("Updating status...");
    setDisplayStatus(newStatus);
    setIsOpen(false);

    try {
      const response = await fetch(`/api/conversations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      toast.update(toastId, {
        render: "Status updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      router.refresh();
    } catch (error) {
      setDisplayStatus(status);
      toast.update(toastId, {
        render: error.message || "Failed to update status",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {role === 0 ? (
        <div className="flex items-center select-none">
          <StatusIcon status={status} />
          <Typography size="body2" style={{ color: currentConfig?.color }} className="font-semibold lg:font-normal">
            {currentConfig?.text}
          </Typography>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <Typography size="body2" className="font-semibold">
            Status:
          </Typography>

          <div className="relative">
            <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setIsOpen(!isOpen)}>
              <StatusIcon status={displayStatus} />
              <Typography size="body2" style={{ color: currentConfig?.color }}>
                {currentConfig?.text}
              </Typography>
              <DownArrow className={isOpen ? "rotate-180" : ""} />
            </div>

            {isOpen && (
              <div className="absolute z-10 mt-1 w-[200px] bg-white border border-input-field">
                <ul className="max-h-80 overflow-auto">
                  {statusOptions.map((option) => {
                    const optionConfig = STATUS_CONFIG[option];
                    return (
                      <li
                        key={option}
                        className="p-2 text-[15px] flex items-center gap-1 cursor-pointer hover:bg-gray-50"
                        onClick={() => updateStatus(option)}
                      >
                        <StatusIcon status={option} />
                        <span style={{ color: optionConfig?.color }}>{optionConfig?.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
