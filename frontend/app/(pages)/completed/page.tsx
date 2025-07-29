"use client";
import Tasks, { ITask } from "../../Components/Tasks/Tasks";
import { useTodoList } from "../../hooks/useTodoList";

const Page = () => {
  const { data } = useTodoList();

  const completedTasks = data?.filter(
    (task: ITask) => task.isCompleted === true
  );
  if (completedTasks)
    return <Tasks title="Completed Tasks" tasks={completedTasks} />;
};

export default Page;
