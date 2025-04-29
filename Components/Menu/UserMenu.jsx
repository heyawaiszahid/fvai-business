"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import DownArrow from "../Icons/DownArrow";

const UserMenu = ({ session }) => {
  const user = session?.user || {};

  const [menuOpen, setMenuOpen] = useState(false);

  const overlay = (
    <div onClick={() => setMenuOpen(false)} className="fixed z-10 top-0 left-0 w-full h-full bg-black opacity-35"></div>
  );

  return (
    <>
      <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-4 cursor-pointer">
        <div className="border-main border-2 rounded-full w-8 lg:w-11 h-8 lg:h-11 overflow-hidden bg-background">
          <Image
            src={user.image || "/avatar.svg"}
            alt={user.name || "User avatar"}
            width={44}
            height={44}
            className="object-cover w-full h-full"
          />
        </div>
        <DownArrow className={menuOpen ? "rotate-180" : ""} />
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full px-6 py-4 bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.06)] lg:w-fit lg:min-w-[228px] lg:left-[unset] lg:right-0 lg:border lg:border-input-field lg:mt-2">
          <div className="flex flex-col gap-6 font-semibold">
            <Link href="/settings">My Settings</Link>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="text-left cursor-pointer">
              Log out
            </button>
          </div>
        </div>
      )}
      {menuOpen && typeof window !== "undefined" && createPortal(overlay, document.body)}
    </>
  );
};

export default UserMenu;
