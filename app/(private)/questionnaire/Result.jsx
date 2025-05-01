"use client";

import Typography from "@/Components/Typography";

const Result = ({ accepted }) => {
  return accepted ? (
    <div className="container lg:max-w-[1080px] lg:pt-10 text-center py-20">
      <Typography size="h3" className="mb-6">
        Accepted
      </Typography>
    </div>
  ) : (
    <div className="container lg:max-w-[1080px] lg:pt-10 text-center py-20">
      <Typography size="h3" className="mb-6">
        Declined
      </Typography>
    </div>
  );
};

export default Result;
