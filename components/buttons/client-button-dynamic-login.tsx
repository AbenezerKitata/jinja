"use client";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { AlignJustify, Home, HomeIcon, Link, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./client-button-mode-toggle";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function LoginButton() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Menubar className="border-none shadow-none">
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Button className="hover:cursor-pointer" variant="ghost" size="icon">
            <AlignJustify />
          </Button>
        </MenubarTrigger>
        <MenubarContent className="flex justify-between">
          {pathname !== "/login" ? (
            <MenubarItem>
              <Button
                onClick={() => {
                  router.push("/login");
                }}
                variant="ghost"
                className="rounded-full"
              >
                <Lock />
              </Button>
            </MenubarItem>
          ) : (
            <MenubarItem>
              <Button
                onClick={() => {
                  router.push("/");
                }}
                variant="ghost"
                className="rounded-full"
              >
                <Home />
              </Button>
            </MenubarItem>
          )}
          <MenubarItem>
            <ModeToggle />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
