import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { Link as RouterLink } from "react-router-dom";
const Header = () => {
  return (
    <Navbar position="static">
      <NavbarBrand>
        <p className="font-bold text-inherit">Travel-Planner</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Discover
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            <RouterLink to="/itinerary">Itineraries</RouterLink>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Weather
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Translate
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
