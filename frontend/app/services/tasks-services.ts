import { ITask } from "./../Components/Tasks/Tasks";
import $api from "@/http";
import toast from "react-hot-toast";

export type UserID = string;

class TaskServices {
  async getAllTasks(
    userId: UserID,
    page: number
  ): Promise<ITask[] | undefined> {
    try {
      const { data } = await $api.get("/tasks", { params: { userId, page } });
      return data.tasks;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  async createTask(formData: ITask) {
    try {
      const res = await $api.post("/tasks", formData);

      if (res.data.error) {
        toast.error(res.data.error);
      }
      if (!res.data.error) {
        toast.success("Task created successfully");
        return res.data;
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  async updateTask(formData: ITask) {
    try {
      const res = await $api.patch(`/tasks/${formData._id}`, formData);

      if (!res.data.error) {
        toast.success("Task updated");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  async deleteTask(id: string) {
    try {
      const res = await $api.delete(`/tasks/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
}

const taskServices = new TaskServices();

export default taskServices;
