"use client";

import React from "react";
import styled from "styled-components";

interface Props {
  icon?: React.ReactNode;
  name?: string;
  background?: string;
  padding?: string;
  borderRad?: string;
  fw?: string;
  fs?: string;
  border?: string;
  type?: "submit" | "button" | "reset" | undefined;
  color?: string;
  click?: () => void;
}

const Button = ({
  icon,
  name,
  background,
  padding,
  borderRad,
  fw,
  fs,
  border,
  type,
  color,
  click,
}: Props) => {
  return (
    <ButtonStyled
      name={name}
      onClick={click}
      type={type}
      style={{
        backgroundColor: background,
        padding: padding || "0.5rem 1rem",
        borderRadius: borderRad || "0.5rem",
        fontSize: fs,
        fontWeight: fw || "500",
        border: border || "none",
        color: color,
      }}
    >
      {icon && icon}
      {name}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 5;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  i {
    margin-right: 1rem;
    font-size: 1.5rem;
  }

  &:hover {
    color: var(--base-color);
  }
`;

export default Button;
