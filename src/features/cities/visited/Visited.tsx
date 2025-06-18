import { Outlet } from "react-router-dom";
import { AppLinks } from "../../sidebar/AppLinks";

export const Visited = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <AppLinks desc="visited" />
      <Outlet />
    </div>
  );
};
