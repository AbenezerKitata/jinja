import React from "react";
import AuthButton from "./auth-button";
import { ModeToggle } from "./mode-toggle";

const RightNavBar = () => {
  return (
    <div className="flex gap-10">
      <ModeToggle />
      <AuthButton />
    </div>
  );
};

export default RightNavBar;
