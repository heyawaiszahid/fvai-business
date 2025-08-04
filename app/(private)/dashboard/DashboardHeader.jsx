"use client";

import Typography from "@/Components/UI/Typography";
import Actions from "./Actions";

export default function DashboardHeader({ role, selectedConversation }) {
  return (
    <div className={`${selectedConversation ? "hidden lg:block" : "block"} pt-4 lg:pt-0`}>
      {role !== 2 ? (
        <div className="px-2 lg:px-6 flex items-center justify-between mb-6">
          <Typography size="h5" className="font-semibold">
            My Dashboard
          </Typography>
          {role === 0 && <Actions />}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 mb-10">
          <Typography size="h5">Welcome, Admin</Typography>
          <Typography size="body2" className="max-w-[654px] text-center">
            Review and assign incoming valuation requests and chats to employees. Track ongoing cases and manage
            communications.
          </Typography>
        </div>
      )}
    </div>
  );
}
