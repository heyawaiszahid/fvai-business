"use client";

import Box from "@/Components/UI/Box";
import Typography from "@/Components/UI/Typography";
import { useEffect, useState } from "react";

const RecommendedEntities = () => {
  const [significantEntitiesCount, setSignificantEntitiesCount] = useState(0);

  useEffect(() => {
    const answers = JSON.parse(localStorage.getItem("answers") || "{}");
    setSignificantEntitiesCount(Number(answers["10.2.1"]) || 0);
  }, []);

  return (
    <Box className="flex-1 gap-4 lg:max-w-[456px]">
      <Typography size="h5" className="text-main">
        Recommended Number of Entities to Value:
      </Typography>
      <ul className="list-disc pl-6">
        <li>Main Target Entity</li>
        {significantEntitiesCount > 0 &&
          [...Array(significantEntitiesCount)].map((_, i) => <li key={i}>Significant Partial Entity {i + 1}</li>)}
      </ul>
    </Box>
  );
};

export default RecommendedEntities;
