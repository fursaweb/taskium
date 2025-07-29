"use client";
import Tasks, { ITask } from "../../Components/Tasks/Tasks";
import { useTodoList } from "../../hooks/useTodoList";

const Page = () => {
  const { data } = useTodoList();

  const importantTasks = data?.filter(
    (task: ITask) => task.isImportant === true && task.isCompleted === false
  );

  if (importantTasks)
    return <Tasks title="Important Tasks" tasks={importantTasks} />;
};

export default Page;
