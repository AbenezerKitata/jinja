import React from "react";
import AuthButton from "./button-auth";

const RightNavBar = ({
  searchParams,
}: {
  searchParams: { message?: string };
}) => {
  return (
    <div className="flex gap-10">
      <AuthButton />
    </div>
  );
};

export default RightNavBar;
