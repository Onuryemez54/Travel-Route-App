import { NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { useAppSelector } from "../../app/hooks";
import { LogoutButton } from "./LogoutButton";
import { linkStyle } from "../../utils/linkStyle";

export interface NavLinkType {
  name: "About" | "Pricing" | "Discover" | "Login" | "Register" | "logout";
  path?: string;
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const navbarLinks: NavLinkType[] = [
    { name: "About", path: "/" },
    { name: "Pricing", path: "/pricing" },
    isAuthenticated
      ? { name: "Discover", path: "/app" }
      : { name: "Login", path: "/login" },
    isAuthenticated
      ? { name: "logout" }
      : { name: "Register", path: "/register" },
  ];

  const navbarItemsList = navbarLinks.map((item: NavLinkType) => (
    <li key={item.name}>
      {item.path ? (
        <NavLink
          to={item.path}
          className={({ isActive }) => linkStyle({ isActive })}
          onClick={() => setIsOpen(false)}
        >
          {item.name}
        </NavLink>
      ) : (
        <LogoutButton />
      )}
    </li>
  ));

  return (
    <div className="fixed top-0 z-50 flex items-center justify-between w-full p-4 bg-gray-800 border-b-2 shadow-2xl border-green-400/50 text-stone-200 text-md md:text-lg md:px-6 lg:flex-col lg:gap-4 2xl:text-xl ">
      <Logo className="rounded-full h-13 sm:h-16 md:h-20 lg:h-24 " />
      <ul className="items-center hidden px-3 sm:flex sm:gap-10 md:gap-12 lg:gap-15 ">
        {navbarItemsList}
      </ul>
      <button
        className={`block sm:hidden cursor-pointer ${
          isOpen ? "rotate-90 " : ""
        }  transition-transform duration-400 ease-in-out`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <IoMdClose size={28} /> : <TiThMenu size={28} />}
      </button>
      <ul
        className={`sm:hidden flex flex-col gap-3 absolute left-0 top-19 w-full bg-gray-800 px-4 py-2 origin-top transition-opacity duration-400 ease-in-out opacity-0 
    ${isOpen && "opacity-100"}
  `}
      >
        {navbarItemsList}
      </ul>
    </div>
  );
};
