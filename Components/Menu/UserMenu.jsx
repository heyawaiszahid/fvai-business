import Image from "next/image";
import DownArrow from "../Icons/DownArrow";

const UserMenu = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="border-main border-2 rounded-full w-8 h-8 overflow-hidden bg-background">
        <Image src="/avatar.png" alt="avatar" width={28} height={28} />
      </div>
      <DownArrow />
    </div>
  );
};

export default UserMenu;
