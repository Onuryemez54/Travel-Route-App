import { NavLink } from "react-router-dom";

export const SidebarNav = () => {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-1 sm:px-6 transition-all duration-400 rounded-lg inline-block

    ${
      isActive
        ? "bg-green-400 text-gray-800 font-semibold"
        : "bg-gray-800 text-stone-300 "
    }`;

  return (
    <div className="mt-3 mb-2">
      <ul className="flex bg-gray-800 rounded-lg text-stone-300">
        <li>
          <NavLink className={linkStyle} to="visited">
            Visited
          </NavLink>
        </li>
        <li>
          <NavLink className={linkStyle} to="planned">
            Planned
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
