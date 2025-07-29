import { useQuery, keepPreviousData } from "@tanstack/react-query";
import useTaskStore from "@/app/store/tasks-store";
import { useUser } from "@clerk/nextjs";
import taskServices from "@/app/services/tasks-services";

export function useTodoList() {
  const page = useTaskStore((state) => state.page);
  const { user } = useUser();
  const id = user ? user.id : "";

  const todoListQuery = useQuery({
    queryKey: ["tasks", id, page],
    queryFn: () => taskServices.getAllTasks(id, page),
    placeholderData: keepPreviousData,
  });

  const { data } = todoListQuery;

  return {
    data,
  };
}
