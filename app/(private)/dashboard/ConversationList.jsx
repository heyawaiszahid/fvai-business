"use client";

import Input from "@/Components/UI/Input";

const ConversationList = () => {
  return (
    <div>
      <div className="py-6 px-4 border-b-[1px] border-input-field">
        <Input placeholder="Search" inputClassName="px-4 py-2" />
      </div>
    </div>
  );
};

export default ConversationList;
