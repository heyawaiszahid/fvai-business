"use client";

import Box from "@/Components/UI/Box";
import Typography from "@/Components/UI/Typography";

const FeeStructure = ({ price, answers }) => {
  const answersParsed = JSON.parse(answers);
  const showNote = answersParsed["13"] === "Yes";

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
