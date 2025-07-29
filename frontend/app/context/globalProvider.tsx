"use client";

import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { themes } from "./themes";

export type GlobalContextType = {
  theme: { backgroundColor: string };
  modal: boolean;
  openModal: (type: "CREATE" | "UPDATE") => void;
  closeModal: () => void;
  isLoading: boolean;
  isCreateTask: boolean;
  isUpdateTask: boolean;
  collapsed: "true" | "false";
  setCollapsed: Dispatch<SetStateAction<"true" | "false">>;
};

type Props = {
  children: React.ReactNode;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);
export const GlobalUpdateContext = createContext<{} | null>({});

export const GlobalProvider = ({ children }: Props) => {
  const [selectedTheme, setSelectedTheme] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [isCreateTask, setCreateTask] = useState<boolean>(false);
  const [isUpdateTask, setUpdateTask] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<"true" | "false">("true");

  const theme = themes[selectedTheme];

  const openModal = (type: "CREATE" | "UPDATE") => {
    setModal(true);
    if (type === "CREATE") setCreateTask(true);
    if (type === "UPDATE") setUpdateTask(true);
  };

  const closeModal = () => {
    setModal(false);
    setCreateTask(false);
    setUpdateTask(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        theme,
        modal,
        openModal,
        closeModal,
        isLoading,
        isCreateTask,
        isUpdateTask,
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
