"use client";

import Tasks, { ITask } from "./Components/Tasks/Tasks";
import { useTodoList } from "./hooks/useTodoList";

export default function Home() {
  const { data } = useTodoList();

  return <Tasks title="All Tasks" tasks={data as ITask[]} />;
}
