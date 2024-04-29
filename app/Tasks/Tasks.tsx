"use client";

import React from "react";
import styled from "styled-components";
import TaskItems from "../Components/TaskItem/TaskItem";
import { plus } from "../utils/Icons";
import { useGlobalState } from "../context/globalProvider";
import Modal from "../Components/Modals/Modal";
import CreateContent from "../Components/Modals/CreateContent";

export interface ITask {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
  userId: string;
  id: string;
}

interface Props {
  title: string;
  tasks: Array<ITask>;
}

const Tasks = ({ title, tasks }: Props) => {
  const { isLoading, openModal, modal } = useGlobalState();

  return (
    <TasksStyled>
      {modal && <Modal content={<CreateContent />} />}
      <h1>{title}</h1>

      <div className="tasks grid">
        {tasks.map((task: ITask) => {
          return <TaskItems key={task.id} task={task} />;
        })}
        <button className="create-task" onClick={openModal}>
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
