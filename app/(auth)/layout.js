import AuthHeader from "@/Components/AuthHeader";
import { Poppins } from "next/font/google";
import "../globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-dark bg-background`}>
        <AuthHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
