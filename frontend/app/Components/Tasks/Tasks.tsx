"use client";

import React, { useState } from "react";
import useTaskStore from "@/app/store/tasks-store";
import styled from "styled-components";
import TaskItems from "../TaskItem/TaskItem";
import { plus } from "../../utils/Icons";
import {
  useGlobalState,
  GlobalContextType,
} from "../../context/globalProvider";
import Modal from "../Modals/Modal";
import CreateContent from "../Modals/CreateContent";
import UpdateContent from "../Modals/UpdateContent";

export interface ITask {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
  userId: string | undefined;
  _id?: string;
}

interface Props {
  title: string;
  tasks: Array<ITask>;
}

const Tasks = ({ title, tasks }: Props) => {
  const { isLoading, openModal, modal, isCreateTask, isUpdateTask } =
    useGlobalState() as GlobalContextType;

  const page = useTaskStore((state) => state.page);
  const setPage = useTaskStore((state) => state.setPage);

  const openCreateModal = () => {
    openModal("CREATE");
  };

  return (
    <TasksStyled>
      {modal && isCreateTask && <Modal content={<CreateContent />} />}
      {modal && isUpdateTask && <Modal content={<UpdateContent />} />}

      <h1>{title}</h1>

      <div className="tasks grid">
        {tasks?.map((task: ITask) => {
          return <TaskItems key={task._id} task={task} />;
        })}
        <button className="create-task" onClick={openCreateModal}>
          {plus}
          Add New Task
        </button>
      </div>
    </TasksStyled>
  );
};

const TasksStyled = styled.main`
  padding: 2rem;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--bg-color-2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  overflow-y: auto;
  border-radius: 1rem;

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;
    color: var(--base-color);
    margin-bottom: 1rem;

    &:after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: var(--accent-color);
      border-radius: 0.5rem;
    }
  }
  .create-task {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    height: 16rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed var(--secondary-color);
    transition: all 0.3s ease;

    &:hover {
      background-color: #ebcc98;
      color: var(--base-color);
      border: 3px dashed var(--base-color);
    }
  }

  .tasks {
    margin: 2rem 0;
  }
`;

export default Tasks;
