import ChatButton from "@/Components/UI/ChatButton";

export default function SiteLayout({ children }) {
  return (
    <>
      <main>{children}</main>
      <ChatButton />
    </>
  );
}
