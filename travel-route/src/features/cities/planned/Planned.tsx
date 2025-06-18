import { Outlet } from "react-router-dom";
import { AppLinks } from "../../sidebar/AppLinks";

export const Planned = () => {
  return (
    <div className="flex flex-col items-center w-full scroll">
      <AppLinks desc="planned" />
      <Outlet />
    </div>
  );
};
