"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignHorizontalJustifyCenter, AlignJustify, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./client-button-mode-toggle";
import { usePathname } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AlignJustify />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-44">
        <DropdownMenuGroup>
          <div className="flex justify-between w-full px-2 py-1.5">
            {pathname !== "/login" && (
              <Button
                onClick={() => router.push("/login")}
                variant="ghost"
                className="rounded-full"
              >
                <Lock />
              </Button>
            )}
            <div className="hover:border-2 rounded-full border-2">
              <ModeToggle />
            </div>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
