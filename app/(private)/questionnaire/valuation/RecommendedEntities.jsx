"use client";

import Box from "@/Components/UI/Box";
import Typography from "@/Components/UI/Typography";

const RecommendedEntities = ({ answers }) => {
  const answersParsed = JSON.parse(answers);
  const significantEntitiesCount = Number(answersParsed["10.2.1"]);

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
