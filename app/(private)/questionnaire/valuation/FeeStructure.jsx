"use client";

import Typography from "@/Components/Typography";
import Box from "@/Components/UI/Box";
import { useEffect, useState } from "react";

const FeeStructure = ({ price }) => {
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    const answers = JSON.parse(localStorage.getItem("answers") || "{}");
    setShowNote(answers["13"] === "Yes");
  }, []);

  return (
    <Box className="flex-1 gap-4 lg:max-w-[456px]">
      <Typography size="h5" className="text-main">
        Fee Structure:
      </Typography>
      <ul className="list-disc pl-6">
        <li>Main Target Entity: ${price.main.toLocaleString()}</li>
        <li>Each Significant Partial Entity: ${price.partial.toLocaleString()}</li>
      </ul>
      {showNote && (
        <Typography size="body2">
          Note: Insignificant partial entities and non-operating/surplus assets will be valued at net book value (NBV)
          and do not incur additional fees unless specifically requested.
        </Typography>
      )}
    </Box>
  );
};

export default FeeStructure;
