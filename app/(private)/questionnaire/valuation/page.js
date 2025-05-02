import ConfettiDesktop3 from "@/Components/Icons/ConfettiDesktop3";
import Done from "@/Components/Icons/Done";
import Next from "@/Components/Icons/Next";
import Typography from "@/Components/Typography";
import Box from "@/Components/UI/Box";
import Button from "@/Components/UI/Button";
import Switch from "@/Components/UI/Switch";
import Link from "next/link";
import ButtonUploadLater from "./ButtonUploadLater";

export const metadata = {
  title: "Finalize Your Valuation - FVAI Business",
};

export default function Questionnaire() {
  return (
    <div className="pb-2 lg:pb-0">
      <section className="pt-12 mb-10 bg-custom-gradient">
        <div className="container flex flex-col lg:items-center gap-6">
          <Typography size="h4" lg="h2" className="text-center lg:max-w-[882px]">
            Finalize Your Valuation Scope & Provide Required Documents
          </Typography>
          <Typography size="body2" className="text-center lg:max-w-[658px] lg:mb-4">
            Based on your responses, we can proceed with the valuation as it falls within a standard methodology and
            scope supported by our tool.
          </Typography>
          <div className="flex flex-col lg:flex-row gap-6">
            <Box className="flex-1 gap-4 lg:max-w-[456px]">
              <Typography size="h5" className="text-main">
                Recommended Number of Entities to Value:
              </Typography>
              <ul className="list-disc pl-6">
                <li>Main Target Entity</li>
                <li>Significant Partial Entity 1</li>
                <li>Significant Partial Entity 2</li>
                <li>…etc.</li>
              </ul>
            </Box>
            <Box className="flex-1 gap-4 lg:max-w-[456px]">
              <Typography size="h5" className="text-main">
                Fee Structure:
              </Typography>
              <ul className="list-disc pl-6">
                <li>Main Target Entity: $2,000</li>
                <li>Each Significant Partial Entity: $1,000</li>
              </ul>
              <Typography size="body2">
                Note: Insignificant partial entities and non-operating/surplus assets will be valued at net book value
                (NBV) and do not incur additional fees unless specifically requested.
              </Typography>
            </Box>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="container lg:max-w-[1060px] flex flex-col gap-6 relative">
          <ConfettiDesktop3 className="absolute left-0 top-[20px] scale-x-[-1] hidden lg:block z-[-1]" />
          <ConfettiDesktop3 className="absolute right-[20px] top-[20px] hidden lg:block z-[-1]" />

          <Typography size="h4" lg="h3" className="text-center max-w-80 lg:max-w-full mx-auto">
            Select the Entities to Include in the Valuation Scope
          </Typography>

          <Typography size="body2" className="text-center lg:mb-2">
            Please select the entities below that you'd like us to include in your valuation report.
          </Typography>

          <div className="flex flex-col lg:flex-row gap-6 mb-4">
            <Button variant="light">Main Target Entity</Button>
            <Button variant="light">Significant Partial Entity 1</Button>
            <Button variant="light">Significant Partial Entity 2</Button>
            <Button variant="light">Significant Partial Entity 3</Button>
          </div>

          <Box p="6" className="!bg-dark text-white lg:w-full lg:max-w-[880px] lg:mx-auto lg:flex-row lg:items-center">
            <div>
              <Typography size="h4" lg="h3" className="border-b-[1px] lg:border-b-0 pb-6 mb-6 lg:pb-0 lg:mb-0">
                Fee <br /> Summary
              </Typography>
            </div>
            <div className="lg:flex-1 lg:border-l-[1px] lg:ml-20 lg:pl-16 border-input-field lg:pt-2">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <Typography size="body2" lg="h5" className="font-bold">
                    Main Target Entity x 1
                  </Typography>
                  <Typography size="body2" lg="h5" className="font-bold">
                    $4000
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography size="body2" lg="h5" className="font-bold">
                    Significant Partial Entity x 2
                  </Typography>
                  <Typography size="body2" lg="h5" className="font-bold">
                    $2000
                  </Typography>
                </div>
                <div className="flex justify-between mt-10 lg:mt-6">
                  <Typography size="body2" lg="h5" className="font-bold text-light-blue">
                    Total Fee
                  </Typography>
                  <Typography size="body2" lg="h5" className="font-bold text-light-blue">
                    $6000
                  </Typography>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </section>

      <section className="mb-14 lg:bg-white/70 lg:pb-8">
        <div className="bg-white/70 p-4 lg:p-12 mb-4">
          <Typography size="h4" lg="h3" className="mb-6 lg:mb-8 text-center">
            Required Documents
          </Typography>

          <div className="flex flex-col lg:flex-row lg:justify-center">
            <Switch
              label="Historical Financials"
              description="(FY21, FY22, FY23)"
              className="border-b-[2px] border-light-blue-gray pb-6 mb-6 lg:border-b-0 lg:pb-0 lg:mb-0 lg:border-r-[2px] lg:pr-8 lg:mr-8"
            />
            <Switch
              label="Management Accounts"
              description="(up to Valuation Date)"
              className="border-b-[2px] border-light-blue-gray pb-6 mb-6 lg:border-b-0 lg:pb-0 lg:mb-0 lg:border-r-[2px] lg:pr-8 lg:mr-8"
            />
            <Switch label="5-Year Forecast" description="(if DCF is used)" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-end lg:max-w-[900px] lg:mx-auto">
          <div className="px-4 mb-6">
            <Button className="w-full lg:w-fit bg-pale-blue border-pale-blue">Upload Documents Now</Button>
          </div>
          <ButtonUploadLater />
        </div>
      </section>

      <section className="mb-10">
        <div className="container">
          <Box p="6" className="!bg-main text-white flex flex-col lg:flex-row">
            <div className="border-b-[1px] lg:border-b-0 pb-6 lg:pb-0 mb-6 lg:mb-0 lg:pl-12 lg:pr-12">
              <Done className="-mt-[60px] mb-4 lg:-ml-10" />
              <Typography size="h4" lg="h3" className="mb-6 lg:mb-4">
                Review and Confirm
              </Typography>
              <Typography size="body2">
                Please review your selected valuation scope and fee summary before proceeding.
              </Typography>
            </div>
            <div className="lg:pl-24 lg:pr-12 lg:border-l-[1px]">
              <Typography size="h4" lg="h5" className="mb-6 lg:mb-4">
                Confirm & Generate Engagement Letter
              </Typography>
              <Typography size="body2" className="mb-6 lg:mb-4">
                Click below to confirm your selected entities and generate the engagement letter to proceed with the
                valuation.
              </Typography>
              <Button
                variant="outline"
                className="border-white text-white !text-left !text-[20px] !font-bold mb-4 lg:mb-0"
              >
                <div className="flex items-center justify-center gap-4 pl-3">
                  <Done className="w-4 h-4 shrink-0" />
                  <div>Confirm & Generate Engagement Letter</div>
                </div>
              </Button>
            </div>
          </Box>
        </div>
      </section>

      <section className="bg-input-field p-4 mb-4 lg:mb-2">
        <div className="lg:max-w-[544px] lg:mx-auto">
          <Next className="mx-auto" />
          <Typography size="h4" lg="h3" className="text-center lg:max-w-[318px] mx-auto lg:mb-3">
            Need to discuss further?
          </Typography>
          <Typography size="body2" className="text-center font-semibold">
            If you have any questions or need to refine your valuation scope, schedule a call with our team.{" "}
            <Link href="/" className="text-main underline">
              Book a call
            </Link>
            .
          </Typography>
          <Typography size="body2" className="text-center font-semibold mb-4">
            Speak with a valuation expert to clarify your requirements before finalizing.
          </Typography>
          <Button variant="outline" className="w-full !text-left !text-[20px] !font-bold mb-2">
            <div className="flex items-center justify-center gap-4">
              <Done className="w-4 h-4 shrink-0" />
              <div>Schedule a Call</div>
            </div>
          </Button>
        </div>
      </section>
    </div>
  );
}
