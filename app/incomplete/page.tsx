"use client";
import React from "react";
import { useGlobalState } from "../context/globalProvider";
import Tasks from "../Tasks/Tasks";

const Page = () => {
  const { incompletedTasks } = useGlobalState();
  return <Tasks title="Do It Now" tasks={incompletedTasks} />;
};

export default Page;
