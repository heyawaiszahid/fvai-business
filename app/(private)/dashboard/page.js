import Typography from "@/Components/UI/Typography";

export const metadata = {
  title: "Dashboard - FVAI Business",
};

export default function Dashboard() {
  return (
    <div className="pt-12 lg:pt-20 pb-12 lg:pb-20">
      <div className="container lg:max-w-[767px]">
        <Typography size="h4" lg="h2" className="text-center max-w-[300px] lg:max-w-full mx-auto mb-6">
          Dashboard
        </Typography>
      </div>
    </div>
  );
}
