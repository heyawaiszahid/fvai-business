"use client";

import Typography from "@/Components/UI/Typography";

export default function AdminTabs({ unassignedCount, assignedCount, selectedTab, onTabChange }) {
  return (
    <div className="flex mb-6">
      <button
        className={`flex-1 py-2 cursor-pointer bg-white border-b-2 ${
          selectedTab === "unassigned" ? "text-main border-main" : "text-pale-blue border-input-field"
        }`}
        onClick={() => onTabChange("unassigned")}
      >
        <Typography size="body2" className="font-semibold">
          Unassigned chats/projects ({unassignedCount})
        </Typography>
      </button>

      <button
        className={`flex-1 py-2 cursor-pointer bg-white border-b-2 ${
          selectedTab === "assigned" ? "text-main border-main" : "text-pale-blue border-input-field"
        }`}
        onClick={() => onTabChange("assigned")}
      >
        <Typography size="body2" className="font-semibold">
          Assigned chats/projects ({assignedCount})
        </Typography>
      </button>
    </div>
  );
}
