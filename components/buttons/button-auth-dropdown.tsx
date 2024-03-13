import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { LogOut, User as Usr } from "lucide-react";
import { ModeToggle } from "./client-button-mode-toggle";
import { signOut } from "@/lib/actions";
import AccountButtonClient from "./button-auth-dropdown-account";
import { User } from "@supabase/supabase-js";
import Image from "next/image";

const ButtonAuthDropdown = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="elegant" size="med_icon" className="relative">
          {user.user_metadata.avatar_url ? (
            <Image
              className="rounded-full"
              src={user.user_metadata.avatar_url}
              fill
              alt="user avatar"
            />
          ) : (
            <Usr />
          )}{" "}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-44">
        <DropdownMenuGroup>
          <AccountButtonClient user={user} />
          <DropdownMenuSeparator />
          <div className="flex justify-between w-full px-2 py-1.5">
            <div className="hover:border-2 rounded-full border-2">
              <ModeToggle />
            </div>

            <form action={signOut}>
              <Button variant="destructive" type="submit">
                <LogOut />
              </Button>
            </form>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ButtonAuthDropdown;
