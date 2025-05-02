"use client";

import ErrorIllustation from "@/Components/Icons/ErrorIllustation";
import SuccessIllustation from "@/Components/Icons/SuccessIllustation";
import Typography from "@/Components/Typography";
import Box from "@/Components/UI/Box";
import Button from "@/Components/UI/Button";
import Link from "next/link";

const Result = ({ accepted }) => {
  return accepted ? (
    <div className="container lg:max-w-[1080px] pb-10 lg:pt-5">
      <div className="flex flex-col items-center gap-6">
        <SuccessIllustation className="lg:-mb-2" />
        <Typography size="h4" lg="h2" className="text-center">
          <span className="text-main">Congratulations!</span> Your Valuation Request Is Accepted
        </Typography>
        <Typography size="body2" className="text-center lg:max-w-[658px]">
          Based on your responses, we can proceed with the valuation as it falls within a standard methodology and scope
          supported by our tool.
        </Typography>
        <Box className="gap-4 lg:max-w-[456px]">
          <Typography size="h5" className="text-main">
            Recommended Valuation Method
          </Typography>
          <ul className="list-disc pl-6">
            <li>Primary: DCF (Income Approach)</li>
            <li>Cross-check: Market Approach using comparable companies</li>
            <li>Sum-of-the-Parts (SOTP) structure due to group composition</li>
            <li>
              <span className="font-semibold">Special Notes:</span> DLOC/DLOM if stake ≤50%
            </li>
          </ul>
        </Box>
        <Button className="w-60" href="/questionnaire/valuation">
          Go to the next step
        </Button>
      </div>
    </div>
  ) : (
    <div className="container lg:max-w-[1080px] pb-10 lg:pt-5">
      <div className="flex flex-col items-center gap-6">
        <ErrorIllustation className="lg:-mb-2" />
        <Typography size="h4" lg="h2" className="text-center max-w-[817px]">
          We're Sorry, but We Can't Proceed
        </Typography>
        <Typography size="body2" className="text-center lg:max-w-[658px]">
          Based on the details provided, your project requires specialized valuation methods that our tool does not
          currently support. Please contact{" "}
          <Link href="mailto:bilal.noorgat@fvaadvisory.com" className="text-main underline">
            bilal.noorgat@fvaadvisory.com
          </Link>{" "}
          for bespoke valuation service.
        </Typography>
        <Button href="#" className="w-60 mb-10 lg:-mb-2">
          Schedule a Call
        </Button>
        <Link href="/" className="text-main underline font-semibold">
          Go Back
        </Link>{" "}
      </div>
    </div>
  );
};

export default Result;
