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
      <button onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer lg:hidden">
        {menuOpen ? <Close /> : <Hamburger />}
      </button>

      <div
        className={`${menuOpen ? "block" : "hidden"} lg:block absolute lg:static top-full left-0 w-full px-6 bg-white`}
      >
        {!session ? (
          <div className="flex flex-col lg:flex-row lg:justify-end gap-6">
            <Button href="/questionnaire">Start Your Valuation</Button>
            <Button href="/join-free-course" variant="outline">
              Join Free Course
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 lg:py-4 font-semibold">
            <Link href="/dashboard">My Dashboard</Link>
            <Link href="/questionnaire">Start Valuation</Link>
          </div>
        )}
      </div>

      {menuOpen && typeof window !== "undefined" && createPortal(overlay, document.body)}
    </>
  );
};

export default SiteMenu;
