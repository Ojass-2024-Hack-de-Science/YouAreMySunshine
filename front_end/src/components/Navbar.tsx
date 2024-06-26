"use client";

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { Spotlight } from "./ui/Spotlight";
function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
     
      <Menu setActive={setActive}>
        <Link href={"/login"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Login"
          ></MenuItem>
        </Link>

        <Link href={"/signup"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Register"
          ></MenuItem>
        </Link>

        <Link href={"/contact"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Contact Us"
          ></MenuItem>
        </Link>
      </Menu>
    </div>
  );
}

export default Navbar;
