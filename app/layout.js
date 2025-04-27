import Header from "@/Components/Header";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/Components/Footer";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "FVAI Business",
  description: "Transform Business Valuation from Weeks to Days",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-dark bg-background`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
