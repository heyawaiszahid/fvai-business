import Confetti from "@/Components/Icons/Confetti";
import Confetti2 from "@/Components/Icons/Confetti2";
import ConfettiDesktop from "@/Components/Icons/ConfettiDesktop";
import ConfettiDesktop2 from "@/Components/Icons/ConfettiDesktop2";
import Cost from "@/Components/Icons/Cost";
import Delivery from "@/Components/Icons/Delivery";
import EnterpricePrecision from "@/Components/Icons/EnterpricePrecision";
import Good from "@/Components/Icons/Good";
import Next from "@/Components/Icons/Next";
import Secure from "@/Components/Icons/Secure";
import Typography from "@/Components/Typography";
import Box from "@/Components/UI/Box";
import Button from "@/Components/UI/Button";

export default function Home() {
  const HowItWorks = [
    {
      title: "Start Your Valuation",
      description: "Click the button below and answer a few quick questions about your business.",
    },
    {
      title: "Upload Key Documents",
      description: "Provide the necessary financial and operational data.",
    },
    {
      title: "AI-Driven Analysis",
      description:
        "Our system processes your information, performs the financial analysis, and sends you a set of due diligence questions within 24 hours.",
    },
    {
      title: "Expert Oversight",
      description:
        "Our valuation specialists review every report to ensure accuracy and alignment with regulatory and industry standards.",
    },
    {
      title: "Receive Your Report",
      description:
        "Within 48 hours, you'll have a high-quality valuation report ready for strategic planning, investor pitches, or regulatory needs. Ready to get started?",
    },
  ];

  return (
    <div>
      <section className="pt-12 lg:pt-20 pb-16 lg:pb-20 bg-custom-gradient">
        <Confetti className="absolute right-0 -top-2 lg:hidden" />
        <Confetti2 className="absolute left-0 top-60 lg:hidden" />
        <ConfettiDesktop className="absolute right-0 -top-2 hidden lg:block" />
        <ConfettiDesktop2 className="absolute left-0 top-60 hidden lg:block" />

        <div className="container">
          <Typography as="h1" size="h3" lg="h1" className="text-center mb-4 lg:mb-16 lg:max-w-[834px] lg:mx-auto">
            <span className="text-gradient">Big 4</span>-Quality Valuation Reports in 48 Hours
          </Typography>

          <Typography size="h5" lg="body1" className="text-center mb-6 lg:mb-20 lg:max-w-[767px] lg:mx-auto">
            <span className="text-gradient">Powered by AI, Delivered by Experts</span> - At a Fraction of Traditional
            Costs
          </Typography>

          <div className="bg-dark text-white p-6 lg:p-16 rounded-default relative z-10">
            <Typography size="body2" className="text-center lg:max-w-[1099px] mx-auto">
              Transform Business Valuation from Weeks to Days. Get Big 4 quality valuations at a fraction of traditional
              costs. Our AI-powered platform combines accuracy, speed, and expertise to deliver professional valuation
              reports when you need them most.
            </Typography>
          </div>
        </div>
      </section>

      <section className="mb-16 lg:mb-20">
        <div className="container">
          <Typography as="h2" size="h4" lg="h2" className="mb-8">
            Benefits
          </Typography>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8 lg:mb-20">
            <Box className="lg:py-8">
              <Delivery className="mb-6 lg:mb-14 lg:w-16 lg:h-16" />
              <Typography size="h5" className="text-main mb-4">
                48-Hour Delivery
              </Typography>
              <Typography size="body2">Lightning-fast turnaround without compromising quality.</Typography>
            </Box>

            <Box className="lg:py-8">
              <EnterpricePrecision className="mb-6 lg:mb-14 lg:w-16 lg:h-16" />
              <Typography size="h5" className="text-main mb-4">
                Enterprise Precision
              </Typography>
              <Typography size="body2">International Valuation Standards (IVS) meets cutting-edge AI.</Typography>
            </Box>

            <Box className="lg:py-8">
              <Cost className="mb-6 lg:mb-14 lg:w-16 lg:h-16" />
              <Typography size="h5" className="text-main mb-4">
                Cost-Effective
              </Typography>
              <Typography size="body2">Premium valuations at 90% less than traditional services.</Typography>
            </Box>

            <Box className="lg:py-8">
              <Secure className="mb-6 lg:mb-14 lg:w-16 lg:h-16" />
              <Typography size="h5" className="text-main mb-4">
                Secure & Confidential
              </Typography>
              <Typography size="body2">Bank-grade security for your sensitive data.</Typography>
            </Box>
          </div>

          <div className="flex flex-col items-center gap-6">
            <Button className="w-fit">Start Your Valuation Now</Button>
            <Button variant="outline" className="w-full lg:w-fit">
              Sign up for Free Valuation Course
            </Button>
          </div>
        </div>
      </section>

      <section className="mb-16 lg:mb-20">
        <div className="bg-input-field py-3 px-8 flex flex-col items-center gap-2 lg:flex-row lg:justify-center lg:gap-8">
          <Good />
          <Typography size="body2" className="text-pale-blue text-center">
            Trusted by Investment Funds, Global Corporations, and Professional Services Firms
          </Typography>
        </div>
      </section>

      <section className="mb-16 lg:mb-20">
        <div className="container">
          <div className="lg:hidden">
            {/* prettier-ignore */}
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 343 197">
              <path d="M8 1h327a7 7 0 0 1 7 7v134H1V8a7 7 0 0 1 7-7" fill="#fff" />
              <path d="M8 1h327a7 7 0 0 1 7 7v134H1V8a7 7 0 0 1 7-7Zm0 132L334.4 8M8.6 8 335 133" stroke="#DBDBDB" strokeWidth="2" />
              <path fill="#fff" d="M123.5 60h97v24h-97z" />
              <path d="M137.96 69.45 135.58 76h-1.36l-2.38-6.55h1.37l1.66 5.04h.06l1.66-5.04zm1.2 6.55v-6.55h1.27V76zm.64-7.56a.8.8 0 0 1-.57-.22.7.7 0 0 1-.24-.53q0-.32.24-.54a.8.8 0 0 1 .57-.23q.33 0 .56.23a.7.7 0 0 1 .24.54q0 .3-.24.53a.8.8 0 0 1-.56.22m4.8 7.69a2.5 2.5 0 0 1-2.4-1.57 4 4 0 0 1-.34-1.82q0-1.05.35-1.82.35-.75.98-1.15.62-.4 1.41-.4.6 0 .98.2.37.21.58.47.21.27.32.48h.08v-3.25h1.28V76h-1.25v-1.02h-.1q-.12.21-.34.48a1.9 1.9 0 0 1-1.56.67m.27-1.09q.56 0 .93-.29.39-.3.58-.81.2-.52.2-1.21t-.2-1.2-.57-.8a1.5 1.5 0 0 0-.94-.28q-.57 0-.96.3-.37.3-.57.81-.2.52-.2 1.17t.2 1.18q.2.52.58.83.4.3.95.3m7.6 1.1q-.96 0-1.66-.42a3 3 0 0 1-1.08-1.17q-.37-.75-.37-1.78 0-1 .37-1.77.38-.77 1.06-1.2t1.6-.43q.54 0 1.07.18a2.6 2.6 0 0 1 1.58 1.6q.24.62.24 1.5v.46h-5.2v-.95h3.95q0-.51-.2-.9a1.6 1.6 0 0 0-1.44-.84q-.53 0-.93.27-.4.26-.62.68t-.21.9v.75q0 .66.23 1.12t.65.7q.41.24.98.24.36 0 .66-.1t.51-.32q.22-.2.34-.51l1.2.21q-.15.54-.52.94t-.93.61-1.28.22m6.98 0a2.8 2.8 0 0 1-2.67-1.6q-.38-.77-.38-1.78 0-1.03.38-1.78a2.8 2.8 0 0 1 2.67-1.61 2.8 2.8 0 0 1 2.67 1.6q.38.76.38 1.79 0 1-.37 1.77a2.8 2.8 0 0 1-2.68 1.6m0-1.08q.6 0 1-.31.39-.32.58-.84.19-.53.19-1.16t-.2-1.15a2 2 0 0 0-.57-.85q-.4-.31-1-.32-.6 0-.99.32-.4.33-.58.85a3 3 0 0 0-.2 1.15q0 .63.2 1.16t.58.84q.4.3 1 .31m7.65 3.4v-9h1.25v1.06h.1q.12-.21.32-.48t.58-.47.98-.2a2.6 2.6 0 0 1 2.4 1.55q.35.75.35 1.82 0 1.05-.35 1.82-.36.75-.97 1.16-.63.4-1.41.4-.6 0-.98-.2a2 2 0 0 1-.59-.46 4 4 0 0 1-.33-.48h-.07v3.47zm1.25-5.73q0 .69.2 1.2.2.53.58.82.38.3.93.3.57 0 .95-.31.39-.3.58-.83.2-.53.2-1.18t-.2-1.17a2 2 0 0 0-.57-.81q-.39-.3-.96-.3-.55 0-.94.29-.37.28-.57.8-.2.5-.2 1.19m6.16 3.27v-6.55h1.23v1.04h.07q.18-.52.63-.83.46-.3 1.03-.3l.54.03v1.22l-.27-.05-.4-.03q-.45 0-.8.19a1.4 1.4 0 0 0-.76 1.28v4zm7.2.13q-.97 0-1.68-.41a3 3 0 0 1-1.07-1.17q-.37-.75-.37-1.78 0-1 .37-1.77t1.06-1.2q.67-.43 1.6-.43.55 0 1.06.18a2.6 2.6 0 0 1 1.6 1.6q.23.62.23 1.5v.46h-5.2v-.95h3.95q0-.51-.2-.9a1.6 1.6 0 0 0-1.44-.84q-.54 0-.94.27-.4.26-.61.68t-.21.9V73q0 .66.23 1.12t.65.7.97.24q.38 0 .66-.1.3-.1.52-.32.22-.2.33-.51l1.2.21q-.13.54-.51.94-.37.4-.94.61-.56.22-1.27.22m9.63-6.68L188.96 76h-1.36l-2.38-6.55h1.37l1.66 5.04h.06l1.66-5.04zm1.2 6.55v-6.55h1.27V76zm.64-7.56a.8.8 0 0 1-.58-.22.7.7 0 0 1-.23-.53q0-.32.23-.54a.8.8 0 0 1 .58-.23q.32 0 .56.23a.7.7 0 0 1 .24.54q0 .3-.24.53a.8.8 0 0 1-.56.22m5.16 7.7q-.96 0-1.66-.42a3 3 0 0 1-1.08-1.17q-.37-.75-.37-1.78 0-1 .37-1.77t1.06-1.2q.67-.43 1.6-.43.54 0 1.07.18a2.6 2.6 0 0 1 1.58 1.6q.24.62.24 1.5v.46h-5.2v-.95h3.95q0-.51-.2-.9a1.6 1.6 0 0 0-1.44-.84q-.54 0-.94.27-.4.26-.61.68t-.21.9V73q0 .66.23 1.12t.65.7.97.24q.37 0 .66-.1t.52-.32q.23-.2.33-.51l1.2.21q-.13.54-.51.94-.37.4-.93.61-.56.22-1.28.22m5.63-.14-1.93-6.55h1.32l1.28 4.81h.07l1.28-4.8h1.32l1.28 4.78h.06l1.28-4.79h1.31l-1.9 6.58h-1.3l-1.33-4.73h-.1L205.28 76z" fill="#949494" />
              <path d="M342 142v47a7 7 0 0 1-7 7H8a7 7 0 0 1-7-7v-47z" stroke="#DBDBDB" strokeWidth="2" />
              <path d="M16 150h24a7 7 0 0 1 7 7v24a7 7 0 0 1-7 7H16a7 7 0 0 1-7-7v-24a7 7 0 0 1 7-7" fill="#fff" />
              <path d="M16 150h24a7 7 0 0 1 7 7v24a7 7 0 0 1-7 7H16a7 7 0 0 1-7-7v-24a7 7 0 0 1 7-7Z" stroke="#DBDBDB" strokeWidth="2"/>
              <path d="M24 176v-14l10 6.7z" fill="#000" />
              <rect x="56" y="167" width="279" height="4" rx="2" fill="#DBDBDB" />
              <rect x="56" y="167" width="54.25" height="4" rx="2" fill="#000" />
            </svg>
          </div>

          <div className="hidden lg:flex lg:justify-center">
            {/* prettier-ignore */}
            <svg width="558" height="327" viewBox="0 0 558 327" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1H550C553.866 1 557 4.13401 557 8V272H1V8C1 4.13401 4.13401 1 8 1Z" fill="white"/>
              <path d="M8 1H550C553.866 1 557 4.13401 557 8V272H1V8C1 4.13401 4.13401 1 8 1Z" stroke="#DBDBDB" strokeWidth="2"/>
              <path d="M8 263L549.02 8.00001M8.98043 8L550 263" stroke="#DBDBDB" strokeWidth="2"/>
              <rect width="97" height="24" transform="translate(230.5 125)" fill="white"/>
              <path d="M244.956 134.455L242.582 141H241.219L238.841 134.455H240.209L241.866 139.491H241.935L243.588 134.455H244.956ZM246.153 141V134.455H247.428V141H246.153ZM246.797 133.445C246.575 133.445 246.385 133.371 246.226 133.223C246.07 133.072 245.991 132.893 245.991 132.686C245.991 132.476 246.07 132.297 246.226 132.149C246.385 131.999 246.575 131.923 246.797 131.923C247.018 131.923 247.207 131.999 247.364 132.149C247.523 132.297 247.602 132.476 247.602 132.686C247.602 132.893 247.523 133.072 247.364 133.223C247.207 133.371 247.018 133.445 246.797 133.445ZM251.592 141.128C251.064 141.128 250.592 140.993 250.177 140.723C249.765 140.45 249.441 140.062 249.206 139.56C248.973 139.054 248.856 138.447 248.856 137.74C248.856 137.033 248.974 136.428 249.21 135.925C249.449 135.422 249.775 135.037 250.19 134.77C250.605 134.503 251.075 134.369 251.6 134.369C252.007 134.369 252.333 134.438 252.581 134.574C252.831 134.707 253.024 134.864 253.16 135.043C253.299 135.222 253.407 135.379 253.484 135.516H253.561V132.273H254.835V141H253.591V139.982H253.484C253.407 140.121 253.297 140.28 253.152 140.459C253.01 140.638 252.814 140.794 252.564 140.928C252.314 141.061 251.99 141.128 251.592 141.128ZM251.873 140.041C252.24 140.041 252.549 139.945 252.802 139.751C253.058 139.555 253.251 139.284 253.382 138.938C253.515 138.591 253.582 138.187 253.582 137.727C253.582 137.273 253.517 136.875 253.386 136.534C253.255 136.193 253.064 135.928 252.811 135.737C252.558 135.547 252.245 135.452 251.873 135.452C251.49 135.452 251.17 135.551 250.914 135.75C250.659 135.949 250.466 136.22 250.335 136.564C250.207 136.908 250.143 137.295 250.143 137.727C250.143 138.165 250.208 138.558 250.339 138.908C250.47 139.257 250.663 139.534 250.919 139.739C251.177 139.94 251.495 140.041 251.873 140.041ZM259.474 141.132C258.83 141.132 258.274 140.994 257.808 140.719C257.345 140.44 256.987 140.05 256.734 139.547C256.484 139.041 256.359 138.449 256.359 137.77C256.359 137.099 256.484 136.509 256.734 135.997C256.987 135.486 257.339 135.087 257.791 134.8C258.246 134.513 258.777 134.369 259.385 134.369C259.754 134.369 260.112 134.43 260.459 134.553C260.805 134.675 261.116 134.866 261.392 135.128C261.668 135.389 261.885 135.729 262.044 136.146C262.203 136.561 262.283 137.065 262.283 137.659V138.111H257.08V137.156H261.034C261.034 136.821 260.966 136.524 260.83 136.266C260.693 136.004 260.501 135.798 260.254 135.648C260.01 135.497 259.723 135.422 259.393 135.422C259.036 135.422 258.723 135.51 258.456 135.686C258.192 135.859 257.987 136.087 257.842 136.368C257.7 136.646 257.629 136.949 257.629 137.276V138.021C257.629 138.459 257.706 138.831 257.859 139.138C258.016 139.445 258.233 139.679 258.511 139.841C258.79 140 259.115 140.08 259.487 140.08C259.729 140.08 259.949 140.045 260.148 139.977C260.347 139.906 260.518 139.801 260.663 139.662C260.808 139.523 260.919 139.351 260.996 139.146L262.202 139.364C262.105 139.719 261.932 140.03 261.682 140.297C261.435 140.561 261.124 140.767 260.749 140.915C260.376 141.06 259.952 141.132 259.474 141.132ZM266.453 141.132C265.84 141.132 265.304 140.991 264.847 140.71C264.39 140.429 264.034 140.036 263.782 139.53C263.529 139.024 263.402 138.433 263.402 137.757C263.402 137.078 263.529 136.484 263.782 135.976C264.034 135.467 264.39 135.072 264.847 134.791C265.304 134.51 265.84 134.369 266.453 134.369C267.067 134.369 267.603 134.51 268.06 134.791C268.517 135.072 268.873 135.467 269.125 135.976C269.378 136.484 269.505 137.078 269.505 137.757C269.505 138.433 269.378 139.024 269.125 139.53C268.873 140.036 268.517 140.429 268.06 140.71C267.603 140.991 267.067 141.132 266.453 141.132ZM266.458 140.062C266.855 140.062 267.185 139.957 267.446 139.747C267.708 139.537 267.901 139.257 268.026 138.908C268.154 138.558 268.218 138.173 268.218 137.753C268.218 137.335 268.154 136.952 268.026 136.602C267.901 136.25 267.708 135.967 267.446 135.754C267.185 135.541 266.855 135.435 266.458 135.435C266.057 135.435 265.725 135.541 265.461 135.754C265.199 135.967 265.005 136.25 264.877 136.602C264.752 136.952 264.689 137.335 264.689 137.753C264.689 138.173 264.752 138.558 264.877 138.908C265.005 139.257 265.199 139.537 265.461 139.747C265.725 139.957 266.057 140.062 266.458 140.062ZM274.103 143.455V134.455H275.347V135.516H275.453C275.527 135.379 275.634 135.222 275.773 135.043C275.912 134.864 276.105 134.707 276.353 134.574C276.6 134.438 276.926 134.369 277.333 134.369C277.861 134.369 278.333 134.503 278.748 134.77C279.162 135.037 279.488 135.422 279.723 135.925C279.962 136.428 280.081 137.033 280.081 137.74C280.081 138.447 279.963 139.054 279.728 139.56C279.492 140.062 279.168 140.45 278.756 140.723C278.344 140.993 277.874 141.128 277.346 141.128C276.948 141.128 276.623 141.061 276.37 140.928C276.12 140.794 275.924 140.638 275.782 140.459C275.64 140.28 275.53 140.121 275.453 139.982H275.377V143.455H274.103ZM275.351 137.727C275.351 138.187 275.418 138.591 275.551 138.938C275.685 139.284 275.878 139.555 276.131 139.751C276.384 139.945 276.694 140.041 277.06 140.041C277.441 140.041 277.759 139.94 278.015 139.739C278.27 139.534 278.463 139.257 278.594 138.908C278.728 138.558 278.794 138.165 278.794 137.727C278.794 137.295 278.729 136.908 278.598 136.564C278.471 136.22 278.277 135.949 278.019 135.75C277.763 135.551 277.444 135.452 277.06 135.452C276.691 135.452 276.378 135.547 276.123 135.737C275.87 135.928 275.678 136.193 275.547 136.534C275.417 136.875 275.351 137.273 275.351 137.727ZM281.509 141V134.455H282.74V135.494H282.809C282.928 135.142 283.138 134.865 283.439 134.663C283.743 134.459 284.087 134.357 284.471 134.357C284.55 134.357 284.644 134.359 284.752 134.365C284.863 134.371 284.949 134.378 285.012 134.386V135.605C284.961 135.591 284.87 135.575 284.739 135.558C284.608 135.538 284.478 135.528 284.347 135.528C284.046 135.528 283.777 135.592 283.542 135.72C283.309 135.845 283.124 136.02 282.988 136.244C282.851 136.466 282.783 136.719 282.783 137.003V141H281.509ZM288.701 141.132C288.056 141.132 287.501 140.994 287.035 140.719C286.572 140.44 286.214 140.05 285.961 139.547C285.711 139.041 285.586 138.449 285.586 137.77C285.586 137.099 285.711 136.509 285.961 135.997C286.214 135.486 286.566 135.087 287.018 134.8C287.472 134.513 288.004 134.369 288.612 134.369C288.981 134.369 289.339 134.43 289.685 134.553C290.032 134.675 290.343 134.866 290.619 135.128C290.894 135.389 291.112 135.729 291.271 136.146C291.43 136.561 291.509 137.065 291.509 137.659V138.111H286.306V137.156H290.261C290.261 136.821 290.192 136.524 290.056 136.266C289.92 136.004 289.728 135.798 289.481 135.648C289.237 135.497 288.95 135.422 288.62 135.422C288.262 135.422 287.95 135.51 287.683 135.686C287.418 135.859 287.214 136.087 287.069 136.368C286.927 136.646 286.856 136.949 286.856 137.276V138.021C286.856 138.459 286.933 138.831 287.086 139.138C287.242 139.445 287.46 139.679 287.738 139.841C288.016 140 288.342 140.08 288.714 140.08C288.955 140.08 289.175 140.045 289.374 139.977C289.573 139.906 289.745 139.801 289.89 139.662C290.035 139.523 290.146 139.351 290.222 139.146L291.428 139.364C291.332 139.719 291.158 140.03 290.908 140.297C290.661 140.561 290.35 140.767 289.975 140.915C289.603 141.06 289.178 141.132 288.701 141.132ZM298.335 134.455L295.961 141H294.598L292.22 134.455H293.588L295.245 139.491H295.314L296.967 134.455H298.335ZM299.532 141V134.455H300.806V141H299.532ZM300.176 133.445C299.954 133.445 299.764 133.371 299.605 133.223C299.449 133.072 299.37 132.893 299.37 132.686C299.37 132.476 299.449 132.297 299.605 132.149C299.764 131.999 299.954 131.923 300.176 131.923C300.397 131.923 300.586 131.999 300.743 132.149C300.902 132.297 300.981 132.476 300.981 132.686C300.981 132.893 300.902 133.072 300.743 133.223C300.586 133.371 300.397 133.445 300.176 133.445ZM305.342 141.132C304.697 141.132 304.141 140.994 303.675 140.719C303.212 140.44 302.854 140.05 302.602 139.547C302.352 139.041 302.227 138.449 302.227 137.77C302.227 137.099 302.352 136.509 302.602 135.997C302.854 135.486 303.207 135.087 303.658 134.8C304.113 134.513 304.644 134.369 305.252 134.369C305.621 134.369 305.979 134.43 306.326 134.553C306.673 134.675 306.984 134.866 307.259 135.128C307.535 135.389 307.752 135.729 307.911 136.146C308.07 136.561 308.15 137.065 308.15 137.659V138.111H302.947V137.156H306.901C306.901 136.821 306.833 136.524 306.697 136.266C306.56 136.004 306.369 135.798 306.121 135.648C305.877 135.497 305.59 135.422 305.261 135.422C304.903 135.422 304.59 135.51 304.323 135.686C304.059 135.859 303.854 136.087 303.71 136.368C303.567 136.646 303.496 136.949 303.496 137.276V138.021C303.496 138.459 303.573 138.831 303.727 139.138C303.883 139.445 304.1 139.679 304.379 139.841C304.657 140 304.982 140.08 305.354 140.08C305.596 140.08 305.816 140.045 306.015 139.977C306.214 139.906 306.386 139.801 306.531 139.662C306.675 139.523 306.786 139.351 306.863 139.146L308.069 139.364C307.972 139.719 307.799 140.03 307.549 140.297C307.302 140.561 306.991 140.767 306.616 140.915C306.244 141.06 305.819 141.132 305.342 141.132ZM310.971 141L309.045 134.455H310.362L311.644 139.261H311.708L312.995 134.455H314.312L315.59 139.24H315.654L316.928 134.455H318.245L316.323 141H315.023L313.694 136.274H313.596L312.266 141H310.971Z" fill="#949494"/>
              <path d="M557 272V319C557 322.866 553.866 326 550 326H8C4.13401 326 1 322.866 1 319V272H557Z" stroke="#DBDBDB" strokeWidth="2"/>
              <path d="M16 280H40C43.866 280 47 283.134 47 287V311C47 314.866 43.866 318 40 318H16C12.134 318 9 314.866 9 311V287C9 283.134 12.134 280 16 280Z" fill="white"/>
              <path d="M16 280H40C43.866 280 47 283.134 47 287V311C47 314.866 43.866 318 40 318H16C12.134 318 9 314.866 9 311V287C9 283.134 12.134 280 16 280Z" stroke="#DBDBDB" strokeWidth="2"/>
              <path d="M24 306V292L34 298.696L24 306Z" fill="black"/>
              <rect x="56" y="297" width="494" height="4" rx="2" fill="#DBDBDB"/>
              <rect x="56" y="297" width="54.25" height="4" rx="2" fill="black"/>
            </svg>
          </div>
        </div>
      </section>

      <section className="mb-16 lg:mb-20">
        <div className="container lg:flex">
          <div className="shrink-0">
            <Next className="mb-2.5 lg:mb-0" />
            <Typography as="h2" size="h4" lg="h2" className="mb-8">
              How it works
            </Typography>
          </div>

          <Box p="6" className="gap-6 lg:ml-36 relative">
            <ConfettiDesktop className="hidden lg:block absolute -z-[1] -top-8 -left-28 rotate-20" />

            {HowItWorks.map((step, index) => (
              <div key={index} className="flex gap-6 lg:items-center">
                <div className="shrink-0 w-10 lg:w-14 h-10 lg:h-14 rounded-lg bg-main text-white text-body2 lg:text-body1 font-bold flex items-center justify-center">
                  {index + 1}.
                </div>
                <div className="flex flex-col gap-2">
                  <Typography size="h5">{step.title}</Typography>
                  <Typography size="body2">{step.description}</Typography>
                </div>
              </div>
            ))}
          </Box>
        </div>
      </section>

      <section className="mb-16 lg:mb-20">
        <div className="container">
          <Box bg="bg-input-field" p="6" className="justify-center items-center gap-6 lg:p-10">
            <Typography as="h2" size="h4" lg="h2">
              See What You'll Get
            </Typography>
            <Typography size="body2" className="text-center">
              Before committing, preview a sample valuation report to understand the depth and quality of our analysis.
            </Typography>
            <Button>View Sample Report</Button>
          </Box>
        </div>
      </section>

      <section className="mb-16 lg:mb-20">
        <div className="container">
          <Box bg="bg-dark" p="6" className="justify-center items-center gap-6 lg:p-10">
            <Typography as="h2" size="h4" lg="h2" className="text-white">
              Ready to Get Started?
            </Typography>
            <Button className="w-full lg:w-fit">Start Your Valuation Now</Button>
          </Box>
        </div>
      </section>

      <section className="mb-16 lg:mb-20">
        <div className="container flex flex-col items-center">
          <Typography as="h2" size="h4" lg="h2" className="text-center mb-6">
            Want to Learn More First?
          </Typography>
          <Typography size="body2" className="text-center mb-6 lg:max-w-[654px]">
            Join our <span className="text-gradient">Free Valuation Short Course</span>, led by{" "}
            <span className="font-semibold">Bilal Noorgat</span> (CA, CFA, CVA). Delivered via email with concise video
            lessons, you'll discover the fundamentals of business valuation and our process when performing business
            valuations.
          </Typography>
          <Button variant="outline" className="w-full lg:w-fit">
            Sign up for Free Valuation Course
          </Button>
        </div>
      </section>
    </div>
  );
}
