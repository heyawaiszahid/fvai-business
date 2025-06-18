"use client";

import ErrorIllustation from "@/Components/Icons/ErrorIllustation";
import SuccessIllustation from "@/Components/Icons/SuccessIllustation";
import Box from "@/Components/UI/Box";
import Button from "@/Components/UI/Button";
import Typography from "@/Components/UI/Typography";
import Link from "next/link";
import { Fragment } from "react";

const Result = ({ result }) => {
  const { status } = result;

  if (status === "accepted") {
    const { title, subtitle, proposed_valuation_method, entities_treatment, data_requirements, adjustments_discounts } =
      result;

    return (
      <div className="container lg:max-w-[1080px] pb-10 lg:pt-5">
        <div className="flex flex-col items-center gap-6">
          <SuccessIllustation className="lg:-mb-2" />
          <Typography size="h4" lg="h2" className="text-center">
            {title}
          </Typography>
          <Typography size="body2" className="text-center lg:max-w-[658px]">
            {subtitle}
          </Typography>
          <Box className="gap-2 lg:max-w-[456px]">
            {[
              {
                title: "Recommended Valuation Method",
                items: proposed_valuation_method,
              },
              {
                title: "Entities Treatment",
                items: entities_treatment,
              },
              {
                title: "Data Requirements",
                items: data_requirements,
              },
              {
                title: "Adjustment Discounts",
                items: adjustments_discounts,
              },
            ].map(({ title, items }, idx) =>
              items.length > 0 ? (
                <Fragment key={idx}>
                  <Typography size="h5" className="text-main">
                    {title}
                  </Typography>
                  <ul className="list-disc pl-6 mb-4">
                    {items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </Fragment>
              ) : null
            )}
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
          {result.message}
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
