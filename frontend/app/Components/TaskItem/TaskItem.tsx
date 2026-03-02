"use client";

import React from "react";
import { ITask } from "@/app/Components/Tasks/Tasks";
import { edit, trash, fire } from "@/app/utils/Icons";
import formatDate from "@/app/utils/formatDate";
import styled from "styled-components";
import {
  useGlobalState,
  GlobalContextType,
} from "@/app/context/globalProvider";
import useTaskStore from "@/app/store/tasks-store";
import taskServices from "../../services/tasks-services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  task: ITask;
}

const TaskItem = ({ task }: Props) => {
  const { title, description, date, isCompleted, isImportant, _id } = task;

  const queryClient = useQueryClient();

  const setCurrentTask = useTaskStore((state) => state.setCurrentTask);
  const { isLoading, openModal } = useGlobalState() as GlobalContextType;

  const updateTaskMutation = useMutation({
    mutationFn: taskServices.updateTask,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: taskServices.deleteTask,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const handleClick = () => {
    const currentTask = {
      ...task,
      isCompleted: !isCompleted,
    };
    updateTaskMutation.mutate(currentTask);
  };

  const handleDelete = () => {
    if (_id) {
      deleteTaskMutation.mutate({ id: _id, userId: task.userId });
    }
  };

  const openUpdateModal = () => {
    openModal("UPDATE");
    setCurrentTask(task);
  };

  return (
    <TaskItemStyled>
      <div className="task-header">
        <h1>{title}</h1>
        <p>{description}</p>
        {isImportant && <div className="important">{fire}</div>}
      </div>
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
        <button className="edit" onClick={openUpdateModal}>
          {edit}
        </button>
        <button className="delete" onClick={handleDelete}>
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
};

const TaskItemStyled = styled.div`
  position: relative;
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: var(--bg-color-1);
  box-shadow: 0 0 15px 1px var(--bg-color-3);
  border: 2px solid var(--bg-color-3);

  height: 16rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.13);
  }

  .task-header {
    position: relative;
    padding-right: 25px;
  }

  .important {
    position: absolute;
    right: 0;
    top: 7px;
    color: var(--danger-color);
    i {
      font-size: 1.4rem;
    }
  }

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
