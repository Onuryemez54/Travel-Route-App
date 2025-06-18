import { Outlet } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";
import { Footer } from "../components/ui/Footer";

export const RootLayout = () => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen scroll ">
      <Navbar />
      <div>
        <main className="max-w-4xl px-4 py-8 mx-auto mt-5 2xl:max-w-7xl sm:mt-10 md:mt-20 lg:mt-40 ">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
