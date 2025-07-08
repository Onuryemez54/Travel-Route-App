import { AppNav } from "../components/ui/AppNav";
import { Map } from "../features/map/Map";
import { Sidebar } from "../features/sidebar/Sidebar";
import { Button } from "../components/ui/Button";
import {
  TbLayoutSidebarLeftExpandFilled,
  TbLayoutSidebarRightExpandFilled,
} from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleSidebar } from "../features/sidebar/sidebarSlice";
import { PageLoader } from "../components/ui/PageLoader";

const AppLayout = () => {
  const isLoading = useAppSelector((state) => state.cities.isLoading);
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isSidebarOpen);

  return (
    <div className=" grid grid-rows-[auto_1fr] h-screen">
      <AppNav mode="app" />
      <main className="relative w-full overflow-hidden">
        {isLoading && <PageLoader />}
        <Map />
        <div
          className={`absolute top-[11px] left-2 z-30 transition-all duration-100 ${
            isSidebarOpen ? "hover:-translate-x-0.5" : "hover:translate-x-0.5"
          }`}
        >
          <Button type="show" click={() => dispatch(toggleSidebar())}>
            {isSidebarOpen ? (
              <TbLayoutSidebarRightExpandFilled size={20} />
            ) : (
              <TbLayoutSidebarLeftExpandFilled size={20} />
            )}
          </Button>
        </div>

        <div
          className={`absolute z-20 top-1 left-1 bottom-1 min-w-1/4 transition-transform duration-400 ease-in-out  md:block ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <Sidebar />
        </div>

        <footer className="absolute bottom-0 left-0 z-50 text-xs font-semibold text-center text-gray-700 sm:right-0 ">
          © 2025 Travel Route Designed by {"Onur Yemez"}. All rights reserved
        </footer>
      </main>
    </div>
  );
};
export default AppLayout;
