"use client";

import ErrorIllustation from "@/Components/Icons/ErrorIllustation";
import SuccessIllustation from "@/Components/Icons/SuccessIllustation";
import Box from "@/Components/UI/Box";
import Button from "@/Components/UI/Button";
import Typography from "@/Components/UI/Typography";
import Link from "next/link";

const Result = ({ result }) => {
  const { status } = result;

  if (status === "accepted") {
    const { valuation_methods } = result;
    const { primary, secondary, notes } = valuation_methods;

    return (
      <div className="container lg:max-w-[1080px] pb-10 lg:pt-5">
        <div className="flex flex-col items-center gap-6">
          <SuccessIllustation className="lg:-mb-2" />
          <Typography size="h4" lg="h2" className="text-center">
            <span className="text-main">Congratulations!</span> Your Valuation Request Is Accepted
          </Typography>
          <Typography size="body2" className="text-center lg:max-w-[658px]">
            Based on your responses, we can proceed with the valuation as it falls within a standard methodology and
            scope supported by our tool.
          </Typography>
          <Box className="gap-4 lg:max-w-[456px]">
            <Typography size="h5" className="text-main">
              Recommended Valuation Method
            </Typography>
            <ul className="list-disc pl-6">
              <li>{primary}</li>
              {secondary.map((method, i) => (
                <li key={i}>{method}</li>
              ))}
              {notes.length > 0 && (
                <li>
                  <span className="font-semibold">Special Notes:</span> {notes.join(", ")}
                </li>
              )}
            </ul>
          </Box>
          <Button className="w-60" href="/questionnaire/valuation">
            Go to the next step
          </Button>
        </div>
      </div>
    );
  }

  return (
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
        </Link>
      </div>
    </div>
  );
};

export default Result;
