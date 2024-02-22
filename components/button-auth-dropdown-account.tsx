import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { User as Usr } from "lucide-react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { Button } from "./ui/button";

const AccountButtonClient = ({ user }: { user: User }) => {
  return (
    <Link href="/account" className="flex gap-2 items-center w-full flex-grow">
      <DropdownMenuItem className="hover:cursor-pointer hover:border w-full flex gap-2 items-center">
        {user?.user_metadata.avatar_url ? (
          <Button variant="ghost" size="tiny_icon" className="relative">
            <Image
              src={user.user_metadata.avatar_url}
              alt="user avatar"
              className="rounded-full"
              fill
            />
          </Button>
        ) : (
          <Usr className="mr-2 h-4 w-4" />
        )}
        <span>Account</span>
      </DropdownMenuItem>
    </Link>
  );
};

export default AccountButtonClient;
