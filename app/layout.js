import AuthProvider from "@/providers/AuthProvider";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${poppins.className} text-dark bg-background`}>
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
