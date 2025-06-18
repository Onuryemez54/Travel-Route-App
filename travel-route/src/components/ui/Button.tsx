import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  children: string | ReactNode;
  type:
    | "submit"
    | "secondary"
    | "primary"
    | "addCity"
    | "back"
    | "submitTodo"
    | "show"
    | "location"
    | "finish";

  to?: string;
  click?: (e: React.MouseEvent) => void;
};
export const Button = ({ children, type, to, click }: ButtonProps) => {
  const styles = {
    primary:
      "px-4 py-2 sm:px-6 py-3 md:px-8 md:py-4 font-semibold text-white transition duration-300 ease-in-out rounded-full shadow-lg cursor-pointer text-md md:text-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 hover:scale-105 hover:shadow-2xl",
    secondary:
      "p-2 sm:px-4 sm:py-3 font-semibold text-white transition duration-300 ease-in-out rounded-full cursor-pointer bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 hover:scale-105",
    submit:
      "w-full px-4 py-2 text-white font-semibold transition bg-green-500 rounded-full cursor-pointer hover:bg-green-600 cursor-pointer",
    addCity:
      "sm:px-4 py-2 px-3 py-1.5 md:px-5 md:py-2.5 font-semibold text-white bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-md hover:from-green-600 hover:to-green-400 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer",

    back: "p-2 sm:p-3  md:p-4  font-semibold text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-full shadow-md hover:text-green-400 hover:from-gray-900 hover:to-gray-800 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer",

    submitTodo:
      "font-semibold px-2 py-1 md:px-4 md:py-2 text-white focus:ring-2 focus:ring-green-400  transition rounded-2xl bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-400 cursor-pointer",
    show: "block md:hidden p-2  sm:p-3 md:p-4 text-white bg-gradient-to-r from-gray-800 to-gray-900 hover:text-green-400 rounded-full shadow-md hover:from-gray-900 hover:to-gray-800 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer",
    location:
      "absolute bottom-8 sm:bottom-10 right-20 z-1000 bg-amber-300 text-gray-800 hover:bg-gray-800 hover:text-green-400 font-semibold cursor-pointer py-2 px-4 rounded-2xl mx-auto shadow-lg hover:shadow-green-500 hover:shadow-2xl transition-all duration-500",
    finish:
      "px-4 py-2 sm:px-6 py-2 md:px-8 md:py-2 mb-2 font-semibold text-white transition duration-300 ease-in-out rounded-full shadow-lg cursor-pointer text-md md:text-lg bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-cyan-500 hover:to-green-400 hover:scale-105 hover:shadow-2xl",
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  if (click) {
    return (
      <button className={styles[type]} onClick={click}>
        {children}
      </button>
    );
  }

  return <button className={styles[type]}>{children}</button>;
};
