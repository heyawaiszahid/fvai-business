import Typography from "@/Components/Typography";

export default function Home() {
  return (
    <div className="pt-12 lg:pt-20">
      <section className="pb-16 lg:pb-20">
        <div className="container">
          <Typography as="h1" size="h3" lg="h1" className="text-center mb-4 lg:mb-16 lg:max-w-[834px] lg:mx-auto">
            <span className="text-gradient">Big 4</span>-Quality Valuation Reports in 48 Hours
          </Typography>

          <Typography size="h5" lg="body1" className="text-center mb-6 lg:max-w-[767px] lg:mx-auto">
            <span className="text-gradient">Powered by AI, Delivered by Experts</span> - At a Fraction of Traditional
            Costs
          </Typography>

          <div className="bg-dark text-white p-6 rounded-default">
            <Typography size="body2" className="text-center">
              Transform Business Valuation from Weeks to Days Get Big 4 quality valuations at a fraction of traditional
              costs. Our AI-powered platform combines accuracy, speed, and expertise to deliver professional valuation
              reports when you need them most.
            </Typography>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Typography as="h2" size="h4" lg="h2" className="mb-6">
            Benefits
          </Typography>
        </div>
      </section>
    </div>
  );
}
