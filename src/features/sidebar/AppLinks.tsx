import { NavLink } from "react-router-dom";

export const AppLinks = ({ desc }: { desc: "visited" | "planned" }) => {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `px-1 py-1 sm:px-2  transition-all duration-400 rounded-lg inline-block
    ${
      isActive
        ? "bg-green-400 text-gray-800 font-semibold"
        : "bg-gray-800 text-stone-300 "
    }`;

  return (
    <div className="mt-1 mb-1">
      <ul className="flex bg-gray-800 rounded-lg text-stone-300 ">
        <li>
          <NavLink className={linkStyle} to={`${desc}Cities`}>
            Cities
          </NavLink>
        </li>
        <li>
          <NavLink className={linkStyle} to={`${desc}Countries`}>
            Countries
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
