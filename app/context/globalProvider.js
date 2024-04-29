"use client";

import React, { useContext, createContext, useState, useEffect } from "react";
import { themes } from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const theme = themes[selectedTheme];
  const { user } = useUser();

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const getAllTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");

      const sorted = res.data.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      setTasks(sorted);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await axios.put("/api/tasks", task);
      toast.success("Task updated");

      getAllTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const deleteTask = async (id) => {
    try {
      console.log("id: ", id);
      const res = await axios.delete(`/api/tasks/${id}`);
      console.log("res: ", res);
      toast.success("Task deleted");

      getAllTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const incompletedTasks = tasks.filter((task) => task.isCompleted === false);
  const importantTasks = tasks.filter((task) => task.isImportant === true);

  useEffect(() => {
    if (user) getAllTasks();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        modal,
        openModal,
        closeModal,
        getAllTasks,
        deleteTask,
        updateTask,
        isLoading,
        completedTasks,
        incompletedTasks,
        importantTasks,
        collapsed,
        setCollapsed,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
