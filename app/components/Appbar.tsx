import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import SigninButton from "./SigninButton";
import Link from "next/link";
import { GiKnifeFork } from "react-icons/gi";

const Appbar = () => {
  return (
    <Navbar isBordered className="h-[20vh] md:w-[70vw]">
      <NavbarContent justify="start">
        <Link
          className="hover:text-green-100 transition-colors"
          color="foreground"
          href="/"
        >
          <GiKnifeFork className="hover:text-green-100" size={40} />
        </Link>
        <Link
          className="hover:text-green-100 transition-colors "
          color="foreground"
          href="/"
        >
          AI RECIPE APP
        </Link>
      </NavbarContent>
      <NavbarContent justify="end">
        <SigninButton />
      </NavbarContent>
    </Navbar>
  );
};

export default Appbar;