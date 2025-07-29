import { ITask } from "@/app/Components/Tasks/Tasks";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import taskServices, { UserID } from "../services/tasks-services";

interface TaskState {
  currentTask: ITask | null;
  isLoading: boolean;
  setCurrentTask: (task: ITask) => void;
  page: number;
  setPage: (page: number) => void;
}

const useTasksStore = create<TaskState>()(
  devtools((set, get) => ({
    currentTask: null,
    isLoading: false,
    page: 1,

    setCurrentTask: (task: ITask) => {
      set({ currentTask: task });
    },

    setPage: (page: number) => {
      set({ page });
    },
  }))
);

export default useTasksStore;
