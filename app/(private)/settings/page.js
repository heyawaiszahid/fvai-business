import Typography from "@/Components/Typography";

export const metadata = {
  title: "Settings - FVAI Business",
};

export default function Settings() {
  return (
    <div className="pt-12 lg:pt-20 pb-12 lg:pb-20">
      <div className="container lg:max-w-[767px] lg:max-auto">
        <Typography size="h4" lg="h2" className="text-center max-w-[300px] lg:max-w-full mx-auto mb-6">
          Settings
        </Typography>
      </div>
    </div>
  );
}
