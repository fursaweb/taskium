"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import Button from "../Button/Button";
import { plus } from "@/app/utils/Icons";
import { useGlobalState } from "@/app/context/globalProvider";

const CreateContent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    complete: false,
    important: false,
  });

  const { getAllTasks, closeModal } = useGlobalState();

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, checked } = e.target;
    if (name === "important" || name === "complete") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/tasks", formData);

      if (res.data.error) {
        toast.error(res.data.error);
      }
      if (!res.data.error) {
        toast.success("Task created successfully");
        getAllTasks();
        closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <CreateContentStyled onSubmit={handleSubmit}>
      <h1>Create a Task</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          placeholder="Title"
          onChange={handleChange}
        />
      </div>
      <div className="input-control">
        <label htmlFor="title">Description</label>
        <textarea
          rows={4}
          name="description"
          id="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
        />
      </div>
      <div className="input-control">
        <label htmlFor="title">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date}
          placeholder="Date"
          onChange={handleChange}
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="title">Toggle Complete</label>
        <input
          type="checkbox"
          name="complete"
          id="complete"
          value={formData.important.toString()}
          placeholder="Complete"
          onChange={handleChange}
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="title">Toggle Important</label>
        <input
          type="checkbox"
          name="important"
          id="important"
          value={formData.important.toString()}
          placeholder="Important"
          onChange={handleChange}
        />
      </div>
      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name="Create Task"
          icon={plus}
          padding="0.8rem 1.5rem"
          borderRad="0.8rem"
          fw="500"
          fs="1.2rem"
          background="var(--accent-color)"
          color="#000"
        />
      </div>
    </CreateContentStyled>
  );
};

const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
  }

  color: var(--base-color);
  padding: 0 1rem;

  .input-control {
    position: relative;
    margin: 1rem 0;
    font-weight: 500;

    label {
      margin-bottom: 0.7rem;
      display: inline-block;
      font-size: clamp(0.9rem 5vw 1.2rem);

      span {
        color: var(--base-color);
      }
    }

    input,
    textarea {
      width: 100%;
      border: none;
      padding: 0.7rem;
      resize: none;

      background-color: var(--bg-color-1);
      color: var(--secondary-color);
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.5s;
    &:hover {
      background-color: #21d4a4 !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    input {
      width: auto;
    }
  }
`;

export default CreateContent;
