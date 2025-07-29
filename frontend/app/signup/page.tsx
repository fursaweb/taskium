import React from "react";
import { SignUp } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex item-center justify-center">
      <SignUp />
    </div>
  );
};

export default Page;
