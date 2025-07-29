"use client";
import Tasks, { ITask } from "../../Components/Tasks/Tasks";
import { useTodoList } from "../../hooks/useTodoList";

const Page = () => {
  const { data } = useTodoList();

  const incompletedTasks = data?.filter(
    (task: ITask) => task.isCompleted === false
  );
  if (incompletedTasks)
    return <Tasks title="Do It Now" tasks={incompletedTasks} />;
};

export default Page;
