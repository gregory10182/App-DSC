import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import {
  dataContext,
  monthsContext,
  userContext,
} from "../context/dataContext";
import apimonth from "./api/month";
import styled from "styled-components";

const StyledMenu = styled.div`
  background-color: #009635;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  height: 2rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  padding: 0.6rem;
  padding-bottom: 0;
  position: fixed;
  bottom: 0;
  border: 0.15rem solid #e9a42b;
  border-bottom: none;

  & .MenuSelected {
    filter: invert(77%) sepia(99%) saturate(6036%) hue-rotate(331deg)
      brightness(93%) contrast(98%);
  }

  & button {
    border-radius: 0;
    background-color: transparent;
    filter: invert(1);
  }

  @media only screen and (min-width: 768px) {
    width: 70%;
    height: 2.5rem;
  }

  @media only screen and (min-width: 1024px) {
    border-radius: 0;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border: 0.15rem solid #e9a42b;
    border-top: none;
    border-bottom: none;
    border-left: none;
    transform: translateY(50%);
    bottom: 50%;
    left: 0;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 1rem 0.6rem;
    height: 100%;
    width: 2rem;
  }
`;

export default function Menu() {
  const { setUser } = useContext(userContext);
  const { setData } = useContext(dataContext);
  const { setMonths } = useContext(monthsContext);

  const location = useLocation();

  return (
    <StyledMenu>
      <Link to={"/"}>
        <button className={`${location.pathname === "/" && "MenuSelected"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-home-2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
            <path d="M10 12h4v4h-4z"></path>
          </svg>
        </button>
      </Link>
      <Link to={"/calendar"}>
        <button
          className={`${location.pathname === "/calendar" && "MenuSelected"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-calendar-plus"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5"></path>
            <path d="M16 3v4"></path>
            <path d="M8 3v4"></path>
            <path d="M4 11h16"></path>
            <path d="M16 19h6"></path>
            <path d="M19 16v6"></path>
          </svg>
        </button>
      </Link>
      <Link to={"/charts"}>
        <button
          className={`${location.pathname === "/charts" && "MenuSelected"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-chart-bar"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 12m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
            <path d="M9 8m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
            <path d="M15 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
            <path d="M4 20l14 0"></path>
          </svg>
        </button>
      </Link>
      <button
        onClick={() => {
          apimonth.setToken(null);
          window.localStorage.removeItem("loggedUser");
          setUser("");
          setData();
          setMonths();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-logout"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
          <path d="M9 12h12l-3 -3"></path>
          <path d="M18 15l3 -3"></path>
        </svg>
      </button>
    </StyledMenu>
  );
}
