import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-br from-blue-100 via-white to-green-100">
      <h1 className="font-extrabold text-transparent text-9xl bg-clip-text bg-gradient-to-r from-red-400 to-blue-600 drop-shadow-lg">
        404
      </h1>

      <h2 className="mt-4 text-3xl font-semibold text-gray-700">
        Page Not Found
      </h2>

      <p className="max-w-md mt-2 text-gray-500" data-testid="error-message">
        The page you are looking for doesn’t exist or has been moved. Maybe
        check the URL or return to the homepage.
      </p>

      <Link
        to="/"
        className="px-6 py-3 mt-6 text-white transition-all duration-300 rounded-full shadow-md bg-gradient-to-r from-red-400 to-blue-500 hover:from-blue-500 hover:to-red-400 hover:scale-105"
      >
        Go to Homepage
      </Link>
    </section>
  );
};
export default PageNotFound;
