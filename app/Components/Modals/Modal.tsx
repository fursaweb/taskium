"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  content: ReactNode;
}

const Modal = ({ content }: Props) => {
  const { closeModal } = useGlobalState();
  return (
    <ModalStyled>
      <div className="modal-overlay" onClick={closeModal} />
      <div className="modal-content">{content}</div>
    </ModalStyled>
  );
};

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  .modal-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.45);
    filter: blur(4px);
  }

  .modal-content {
    padding: 1.5rem 1rem;
    position: relative;
    max-width: 630px;
    width: 100%;
    z-index: 100;
    background-color: var(--bg-color-2);
    border: 2px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);

    border-radius: 1rem;
  }
`;

export default Modal;
