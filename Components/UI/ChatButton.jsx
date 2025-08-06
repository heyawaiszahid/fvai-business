import Link from "next/link";
import Chat from "../Icons/Chat";

const ChatButton = () => {
  return (
    <div className="fixed z-10 bottom-4 lg:bottom-6 right-4 lg:right-12">
      <Link href="/dashboard?chat=open">
        <Chat />
      </Link>
    </div>
  );
};

export default ChatButton;
