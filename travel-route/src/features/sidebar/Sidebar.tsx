import { Outlet } from "react-router-dom";
import { Logo } from "../../components/ui/Logo";
import { SidebarNav } from "./SidebarNav";
import { BackButton } from "../../components/ui/BackButton";

export const Sidebar = () => {
  return (
    <section className="flex flex-col items-center h-full px-1 py-2 bg-gray-800/95 rounded-2xl backdrop-blur-md">
      <div className="fixed top-2 right-2 z-10">
        <BackButton />
      </div>
      <Logo className="rounded-full h-12 sm:h-15" />
      <SidebarNav />
      <div className="w-full overflow-y-auto scroll">
        <Outlet />
      </div>
    </section>
  );
};
