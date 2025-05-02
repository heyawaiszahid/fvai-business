import Typography from "@/Components/Typography";
import Box from "@/Components/UI/Box";
import Button from "@/Components/UI/Button";
import Switch from "@/Components/UI/Switch";
import ButtonUploadLater from "./ButtonUploadLater";

export const metadata = {
  title: "Finalize Your Valuation - FVAI Business",
};

export default function Questionnaire() {
  return (
    <div className="pb-12 lg:pb-20">
      <section className="pt-12 lg:pt-20 mb-10 bg-custom-gradient">
        <div className="container lg:max-w-[767px] flex flex-col gap-6">
          <Typography size="h4" lg="h2" className="text-center">
            Finalize Your Valuation Scope & Provide Required Documents
          </Typography>
          <Typography size="body2" className="text-center">
            Based on your responses, we can proceed with the valuation as it falls within a standard methodology and
            scope supported by our tool.
          </Typography>
          <Box className="gap-4 lg:max-w-[456px]">
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
          <Box className="gap-4 lg:max-w-[456px]">
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
      </section>

      <section className="mb-10">
        <div className="container lg:max-w-[767px] flex flex-col gap-6">
          <Typography size="h4" lg="h2" className="text-center max-w-80 mx-auto">
            Select the Entities to Include in the Valuation Scope
          </Typography>

          <Typography size="body2" className="text-center">
            Please select the entities below that you'd like us to include in your valuation report.
          </Typography>

          <div className="flex flex-col gap-6 mb-4">
            <Button variant="light">Main Target Entity</Button>
            <Button variant="light">Significant Partial Entity 1</Button>
            <Button variant="light">Significant Partial Entity 2</Button>
            <Button variant="light">Significant Partial Entity 3</Button>
          </div>

          <Box p="6" className="!bg-dark text-white">
            <Typography size="h4" className="mb-6">
              Fee <br /> Summary
            </Typography>

            <div className="w-4/5 bg-white h-[1px] mb-6"></div>

            <div className="flex flex-col gap-2 mb-12">
              <div className="flex justify-between">
                <Typography size="body2" className="font-bold">
                  Main Target Entity x 1
                </Typography>
                <Typography size="body2" className="font-bold">
                  $4000
                </Typography>
              </div>
              <div className="flex justify-between">
                <Typography size="body2" className="font-bold">
                  Significant Partial Entity x 2
                </Typography>
                <Typography size="body2" className="font-bold">
                  $2000
                </Typography>
              </div>
            </div>

            <div className="flex justify-between">
              <Typography size="body2" className="font-bold text-light-blue">
                Total Fee
              </Typography>
              <Typography size="body2" className="font-bold text-light-blue">
                $6000
              </Typography>
            </div>
          </Box>
        </div>
      </section>

      <section className="mb-10">
        <div className="bg-white p-4 mb-4">
          <Typography size="h4" className="mb-6">
            Required Documents
          </Typography>

          <div className="flex flex-col">
            <div className="py-2">
              <Switch label="Historical Financials" description="(FY21, FY22, FY23)" />
              <div className="bg-light-blue-gray h-[2px] mt-6"></div>
            </div>
            <div className="py-2">
              <Switch label="Management Accounts" description="(up to Valuation Date)" />
              <div className="bg-light-blue-gray h-[2px] mt-6"></div>
            </div>
            <div className="py-2">
              <Switch label="5-Year Forecast" description="(if DCF is used)" />
            </div>
          </div>
        </div>

        <div className="px-4 mb-6">
          <Button className="w-full bg-pale-blue border-pale-blue">Upload Documents Now</Button>
        </div>

        <ButtonUploadLater />
      </section>
    </div>
  );
}
