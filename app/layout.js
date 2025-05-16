import AuthProvider from "@/providers/AuthProvider";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: "FVAI Business",
  description: "Transform Business Valuation from Weeks to Days",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-dark bg-background`}>
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
