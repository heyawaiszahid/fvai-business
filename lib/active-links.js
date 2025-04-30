"use client";

import { usePathname } from "next/navigation";

export const useActiveLink = () => {
  const pathname = usePathname();
  return (path) => pathname === path;
};
