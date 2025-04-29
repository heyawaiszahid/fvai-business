"use client";

import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import Close from "../Icons/Close";
import Hamburger from "../Icons/Hamburger";
import Button from "../UI/Button";

const SiteMenu = ({ session }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const overlay = (
    <div onClick={() => setMenuOpen(false)} className="fixed z-10 top-0 left-0 w-full h-full bg-black opacity-35"></div>
  );

  return (
    <>
      <button onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer">
        {menuOpen ? <Close /> : <Hamburger />}
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full p-6 bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.06)]">
          {!session ? (
            <div className="flex flex-col gap-6">
              <Button>Start Your Valuation</Button>
              <Button variant="outline">Join Free Course</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6 font-semibold">
              <Link href="/dashboard">My Dashboard</Link>
              <Link href="/questionnaire">Start Valuation</Link>
            </div>
          )}
        </div>
      )}
      {menuOpen && typeof window !== "undefined" && createPortal(overlay, document.body)}
    </>
  );
};

export default SiteMenu;
