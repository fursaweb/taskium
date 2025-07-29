"use client";
import { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useGlobalState,
  GlobalContextType,
} from "@/app/context/globalProvider";
import { ITask } from "@/app/Components/Tasks/Tasks";
import formatDate from "@/app/utils/formatDate";
import taskServices from "@/app/services/tasks-services";

export function useCreateTask() {
  const { user } = useClerk();
  const queryClient = useQueryClient();
  const { closeModal } = useGlobalState() as GlobalContextType;
  const [formData, setFormData] = useState<ITask>({
    title: "",
    description: "",
    date: formatDate(),
    isCompleted: false,
    isImportant: false,
    userId: user?.id,
  });

  const createTaskMutation = useMutation({
    mutationFn: taskServices.createTask,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, checked } = e.target;

    if (name === "isImportant" || name === "isCompleted") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTaskMutation.mutate(formData);
    closeModal();
  };

  return {
    handleSubmit,
    handleChange,
    formData,
  };
}
