import { NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { LogoutButton } from "./LogoutButton";
import { SearchCity } from "../ui/SearchCity";
import { openSidebar } from "../../features/sidebar/sidebarSlice";
import { linkStyle } from "../../utils/linkStyle";

const navContainer = {
  app: "relative h-20 flex items-center justify-between w-full p-4 border-b-2 border-green-400/50 bg-gray-800/95 shadow-2xl text-stone-300 text-md md:text-lg lg:gap-4",
  detail:
    "fixed top-0 left-0 z-10 h-20 flex items-center justify-between w-full p-4 bg-gray-800/95 shadow-2xl text-stone-300 text-md md:text-lg lg:gap-4",
};

interface AppLinkType {
  name: "Visited" | "Planned" | "logout";
  path?: string;
}

export const AppNav = ({ mode }: { mode: "app" | "detail" }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const appNavLinks: AppLinkType[] = [
    { name: "Visited", path: "/app/visited" },
    { name: "Planned", path: "/app/planned" },
  ];

  if (isAuthenticated) appNavLinks.push({ name: "logout" });

  const handleToggleSidebarAndMenu = () => {
    setIsOpen(false);
    dispatch(openSidebar());
  };

  const appNavItemsList = appNavLinks.map((item: AppLinkType) => (
    <li key={item.name}>
      {item.path ? (
        <NavLink
          to={item.path}
          className={({ isActive }) => linkStyle({ isActive })}
          onClick={() => handleToggleSidebarAndMenu()}
        >
          {item.name}
        </NavLink>
      ) : (
        <LogoutButton />
      )}
    </li>
  ));

  return (
    <div className={navContainer[mode]}>
      <div className="flex items-center gap-2 sm:gap-4">
        <Logo className="h-10 rounded-full sm:h-15" />
        {currentUser && (
          <p className="hidden sm:inline-block font-semibold relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-green-400 after:rounded transition duration-400 cursor-pointer  hover:text-green-400">
            Welcome{" "}
            <span className="font-bold capitalize ">
              {currentUser.firstName}
            </span>
          </p>
        )}
      </div>
      {mode === "app" && <SearchCity />}

      <ul className="items-center hidden gap-4 px-2 sm:flex ">
        {appNavItemsList}
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
        className={`sm:hidden flex flex-col gap-2  absolute right-0 rounded-b-xl top-20 w-30 max-h-50 bg-gray-800/95 px-4 py-2 origin-top transition-opacity duration-400 ease-in-out  z-60 
          ${
            isOpen
              ? "opacity-100 pointer-events-auto visible"
              : "opacity-0 pointer-events-none invisible"
          }
        `}
      >
        {appNavItemsList}
      </ul>
    </div>
  );
};
