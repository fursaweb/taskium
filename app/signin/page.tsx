import React from "react";
import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex item-center justify-center">
      <SignIn />
    </div>
  );
};

export default Page;
