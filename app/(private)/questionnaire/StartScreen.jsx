"use client";

import Footer from "@/Components/Footer";
import Box from "@/Components/UI/Box";
import Button from "@/Components/UI/Button";
import Typography from "@/Components/UI/Typography";
import { useState } from "react";
import Questions from "./Questions";

const StartScreen = () => {
  const [start, setStart] = useState(false);

  return !start ? (
    <>
      <div className="container">
        <section className="mb-6 lg:max-w-[767px] lg:mx-auto">
          <Typography size="h3" lg="h2" className="text-center mb-6">
            Before We Begin: A Quick Overview
          </Typography>
          <Typography size="body2" className="text-center lg:max-w-[600px] lg:mx-auto">
            Before we proceed with your valuation, we need to ask a few key questions. These questions are essential to:
          </Typography>
        </section>

        <section className="mb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <Box p="6" className="flex-1 lg:min-h-44 lg:flex lg:justify-center">
              <div className="flex gap-4 items-center">
                <div className="shrink-0 w-10 lg:w-14 h-10 lg:h-14 rounded-lg bg-main text-white text-body2 lg:text-body1 font-bold flex items-center justify-center">
                  1.
                </div>
                <Typography size="h5" className="text-main">
                  Determine the appropriate valuation approach.
                </Typography>
              </div>
            </Box>
            <Box p="6" className="flex-1 lg:min-h-44 lg:flex lg:justify-center">
              <div className="flex gap-4 items-center">
                <div className="shrink-0 w-10 lg:w-14 h-10 lg:h-14 rounded-lg bg-main text-white text-body2 lg:text-body1 font-bold flex items-center justify-center">
                  2.
                </div>
                <Typography size="h5" className="text-main">
                  Define the valuation scope.
                </Typography>
              </div>
            </Box>
            <Box p="6" className="flex-1 lg:min-h-44 lg:flex lg:justify-center">
              <div className="flex gap-4 items-center">
                <div className="shrink-0 w-10 lg:w-14 h-10 lg:h-14 rounded-lg bg-main text-white text-body2 lg:text-body1 font-bold flex items-center justify-center">
                  3.
                </div>
                <Typography size="h5" className="text-main">
                  Check the availability of critical financial information.
                </Typography>
              </div>
            </Box>
          </div>
        </section>

        <section className="mb-6">
          <Box p="6" className="!bg-dark">
            <Typography size="h5" className="text-white text-center">
              The questionnaire is divided into <span className="text-light-blue">five sections</span> and takes
              approximately <span className="text-light-blue">5 minutes</span> to complete.
            </Typography>
          </Box>
        </section>

        <section className="mb-6 lg:mb-24">
          <Typography size="h4" lg="h2" className="text-center mb-6">
            Ready to Get Started?
          </Typography>
          <Typography size="body2" className="text-center mb-6">
            Click below to begin the questionnaire.
          </Typography>
          <div className="text-center">
            <Button className="w-full lg:max-w-96 lg:text-body1" onClick={() => setStart(true)}>
              Start
            </Button>
          </div>
        </section>
      </div>

      <Footer />
    </>
  ) : (
    <Questions />
  );
};

export default StartScreen;
