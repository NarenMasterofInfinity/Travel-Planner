import React, {useEffect, useState} from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("username") != null ? true : false);
  const OnLogOut = () => {
    localStorage.removeItem("username");
    localStorage.clear();
    setLoggedIn(false);
  }
  return (
    <Navbar position="static" isBordered>
      <NavbarBrand>
        <NavLink
          to="/"
          exact
          className={({ isActive }) =>
            isActive
              ? "font-bold text-[#34e0a1] transform scale-105 transition-all duration-300 ease-in-out"
              : "font-bold text-inherit  "
          }
        >
          Travel-Planner
        </NavLink>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink
            to="/itinerary"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-[#34e0a1] transform scale-105 transition-all duration-300 ease-in-out"
                : "text-inherit "
            }
          >
            Itineraries
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            to="/weather"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-[#34e0a1] transform scale-105 transition-all duration-300 ease-in-out"
                : "text-inherit "
            }
          >
            Weather
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            to="/translate"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-[#34e0a1] transform scale-105 transition-all duration-300 ease-in-out"
                : "text-inherit "
            }
          >
            Translate
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      {!loggedIn && (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-blue-500 transform scale-105 transition-all duration-300 ease-in-out"
                  : "text-inherit "
              }
            >
              Sign In
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <Button as="a" href="/signup" color="primary" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
      {loggedIn && (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <NavLink
              to="/"
              onClick={OnLogOut}
            >
              Log out
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <Button as="a" href="/profile" color="primary" variant="flat">
              User Profile
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
};

export default Header;
