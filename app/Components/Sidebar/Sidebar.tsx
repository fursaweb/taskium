"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";
import { useGlobalState } from "./../../context/globalProvider";
import { menu } from "../../utils/menu";
import { bars, signout, arrowLeft } from "@/app/utils/Icons";
import Button from "../Button/Button";
import { UserButton, useClerk, useUser } from "@clerk/nextjs";

const Sidebar = () => {
  const { theme, collapsed, setCollapsed } = useGlobalState();

  const { user } = useUser();
  const { firstName, lastName, imageUrl } = user || {
    firstName: "",
    lastName: "",
    imageUrl: "",
  };

  const router = useRouter();
  const path = usePathname();

  const { signOut } = useClerk();

  const logout = () => {
    signOut(() => {
      router.push("/signin");
    });
  };

  const handleClick = (link: string) => {
    router.push(link);
  };

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  return (
    <SidebarStyles theme={theme} collapsed={collapsed}>
      <button className="toggle-nav" onClick={toggleMenu}>
        {collapsed ? bars : arrowLeft}
      </button>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image
            width={70}
            height={70}
            src={imageUrl}
            style={{ borderRadius: "50%" }}
            alt="Profile"
          />
        </div>
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton />
        </div>
        <h1>
          <span>{firstName} </span>
          <span>{lastName}</span>
        </h1>
      </div>
      <ul>
        {menu.map((item) => {
          return (
            <li
              key={item.id}
              className={`nav-item ${path === item.link ? "active" : ""}`}
              onClick={() => {
                handleClick(item.link);
              }}
            >
              <span>{item.icon}</span>
              <Link href={item.link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <div className="sign-out relative m-6">
        <Button
          icon={signout}
          name="Sign Out"
          type="submit"
          padding="0.4rem 0.8rem"
          borderRad="0.8rem"
          fw="500"
          fs="1.2rem"
          click={logout}
        />
      </div>
    </SidebarStyles>
  );
};

const SidebarStyles = styled.nav<{ collapsed: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;
  width: 15rem;
  background-color: var(--bg-color-2);
  border: 2px solid rgba(255, 255, 255, 0.5);

  border-radius: 1rem;

  @media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100% - 1rem);
    z-index: 100;
    transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);
    transform: ${(props) =>
      props.collapsed ? "translateX(calc(-100% - 0.9rem))" : "translateX(0)"};
  }

  .toggle-nav {
    display: none;
    position: absolute;
    top: 1.8rem;
    right: -51px;
    padding: 0.3rem 0.5rem 0.2rem 0.2rem;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background-color: var(--bg-color-2);
    border-top: 2px solid rgba(255, 255, 255, 0.5);
    border-right: 2px solid rgba(255, 255, 255, 0.5);
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    z-index: 99;

    @media screen and (max-width: 768px) {
      display: block;
    }
  }

  .user-btn {
    .cl-rootBox {
      width: 100%;
      height: 100%;

      .cl-userButtonBox {
        width: 100%;
        height: 100%;

        .cl-userButtonTrigger {
          width: 100%;
          height: 100%;
          opacity: 0 !important;
        }
      }
    }
  }

  .profile {
    margin: 1.5rem;
    padding: 1rem 0.8rem;
    position: relative;
    font-weight: 500;
    border-radius: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;

    > h1 {
      margin-left: 0.5rem;
      font-size: clamp(0.8rem, 4vw, 1rem);
      line-height: 100%;
    }

    &:hover {
      .profile-overlay {
        opacity: 1;
        border: 2px solid var(--bg-color-2);
      }
    }
  }

  .profile-overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    z-index: 0;
    transition: all 0.55s linear;
    border-radius: 1rem;
    opacity: 0.2;
    border: 2px solid var(--bg-color-2);
    background: var(--bg-color-1);
  }

  h1 {
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }

  .image,
  h1 {
    position: relative;
    z-index: 1;
  }

  .image {
    flex-shrink: 0;
    display: inline-block;
    overflow: hidden;
    transition: all 0.5s ease;
    border-radius: 100%;
    width: 60px;
    height: 60px;

    img {
      border-radius: 100%;
      height: 100%;
      transition: all 0.5s ease;
      object-fit: cover;
    }
  }

  .nav-item {
    position: relative;
    padding: 0.6rem 1rem 0.6rem 2.1rem;
    margin: 0.3rem 0;
    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      z-index: 1;
      transition: all 0.3s ease-in-out;
      background-color: var(--bg-color-1);
      opacity: 0.5;
    }

    &::before {
      content: "";
      position: absolute;
      z-index: 2;
      right: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: var(--accent-color);
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }

    a,
    span {
      position: relative;
      z-index: 2;
    }

    a {
      font-weight: 500;
      transition: all 0.3s ease-in-out;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    i {
      transition: all 0.3s ease-in-out;
    }

    &:hover {
      &::after {
        width: 100%;
      }

      a,
      i {
        color: #07004d;
      }
    }
  }
  .active {
    background-color: var(--bg-color-1);

    &::before {
      width: 0.3rem;
    }

    a,
    i {
      color: var(--base-color);
    }
  }

  > button {
    margin: 1.5rem;
  }
`;

export default Sidebar;
