import Header from "@/Components/Header";

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
