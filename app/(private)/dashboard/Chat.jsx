"use client";

import Attach from "@/Components/Icons/Attach";
import SendMessage from "@/Components/Icons/SendMessage";
import Button from "@/Components/UI/Button";

export default function Chat() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto py-4 lg:px-4"></div>

      <div className="bg-white px-6 py-2 flex items-center gap-4 lg:gap-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Your message..."
            className="w-full lg:px-4 py-4 placeholder:text-pale-blue text-[15px] outline-0"
          />
        </div>
        <div className="shrink-0 flex gap-4 lg:gap-6">
          <Button variant="light" className="py-2 px-2">
            <Attach />
          </Button>
          <Button className="py-2 px-2">
            <SendMessage />
          </Button>
        </div>
      </div>
    </div>
  );
}
