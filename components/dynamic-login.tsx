"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const LoginButton = () => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = () => {
    if (linkRef.current) {
      linkRef.current.click();
    }
  };

  if (!isLoginPage)
    return (
      <>
        <Button variant="elegant" onClick={handleClick}>
          <Link
            href="/login"
            className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            ref={linkRef}
          >
            Login
          </Link>
        </Button>
      </>
    );
};

export default LoginButton;
