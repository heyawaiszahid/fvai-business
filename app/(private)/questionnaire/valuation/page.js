import Done from "@/Components/Icons/Done";
import Next from "@/Components/Icons/Next";
import Box from "@/Components/UI/Box";
import Button from "@/Components/UI/Button";
import Typography from "@/Components/UI/Typography";
import Link from "next/link";
import ButtonGenerateLetter from "./ButtonGenerateLetter";
import EntitySelection from "./EntitySelection";
import FeeStructure from "./FeeStructure";
import RecommendedEntities from "./RecommendedEntities";
import RequiredDocuments from "./RequiredDocuments";

export const metadata = {
  title: "Finalize Your Valuation - FVAI Business",
};

export default function Valuation() {
  const price = { main: 4000, partial: 2000 };

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
          <div className="flex flex-col lg:flex-row gap-6 lg:w-full lg:justify-center">
            <RecommendedEntities />
            <FeeStructure price={price} />
          </div>
        </div>
      </section>

      <EntitySelection price={price} />

      <RequiredDocuments />

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
              <ButtonGenerateLetter />
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
