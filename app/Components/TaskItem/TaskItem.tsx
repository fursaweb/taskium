"use client";

import React from "react";
import { ITask } from "@/app/Tasks/Tasks";
import { edit, trash } from "@/app/utils/Icons";
import formatDate from "@/app/utils/formatDate";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/globalProvider";

interface Props {
  task: ITask;
}

const TaskItem = ({ task }: Props) => {
  const { title, description, date, isCompleted, isImportant, id } = task;
  const { deleteTask, updateTask } = useGlobalState();

  const handleClick = () => {
    const task = {
      id,
      isCompleted: !isCompleted,
    };
    updateTask(task);
  };

  const handleDelete = () => {
    deleteTask(id);
  };

  return (
    <TaskItemStyled>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
        {isCompleted ? (
          <button className="completed" onClick={handleClick}>
            Completed
          </button>
        ) : (
          <button className="incomplete" onClick={handleClick}>
            Incomplete
          </button>
        )}
        <button className="edit">{edit}</button>
        <button className="delete" onClick={handleDelete}>
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
};

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: var(--bg-color-1);
  box-shadow: 0 0 15px 1px var(--bg-color-3);
  border: 2px solid var(--bg-color-3);

  height: 16rem;
  display: flex;
  flex-direction: column;

  .date {
    margin-top: auto;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
      }
    }
  }

  .edit {
    margin-left: auto;
  }

  .completed,
  .incomplete {
    display: inline-block;
    padding: 0.4rem 1rem;
    border-radius: 30px;
    color: #000;
  }

  .completed {
    background-color: var(--accent-color);
  }

  .incomplete {
    background-color: var(--danger-color);
  }
`;

export default TaskItem;
