import Footer from "@/Components/Footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}
