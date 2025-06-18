import { Link } from "react-router-dom";
import { BackButton } from "./BackButton";

export const ErrorMessage = ({ error }: { error: string | null }) => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-br from-blue-100 via-white to-green-100">
      <h1 className=" text-red-500 font-bold text-3xl sm:text-4xl  mb-4">
        {error || "An unexpected error occurred. Please try again later."}
      </h1>

      <div className="flex justify-between items-center w-full px-10 ">
        <BackButton />
        <Link
          to="/"
          className="px-6 py-3 mt-6 text-white transition-all duration-300 rounded-full shadow-md bg-gradient-to-r from-red-400 to-blue-500 hover:from-blue-500 hover:to-red-400 hover:scale-105"
        >
          Go to Homepage
        </Link>
      </div>
    </section>
  );
};
