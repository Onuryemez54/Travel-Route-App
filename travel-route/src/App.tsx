import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { Form } from "./features/cities/components/Form";
import { Visited } from "./features/cities/visited/Visited";
import { Planned } from "./features/cities/planned/Planned";
import { VisitedCities } from "./features/cities/visited/VisitedCities";
import { PlannedCities } from "./features/cities/planned/PlannedCities";
import { VisitedCountries } from "./features/cities/visited/VisitedCountries";
import { PlannedCountries } from "./features/cities/planned/PlannedCountries";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { lazy, useEffect } from "react";
import { fetchUsers } from "./features/auth/authSlice";
import { ProtectedAppPage } from "./Pages/ProtectedAppPage";
import { fetchCities } from "./features/cities/citiesSlice";
import toast, { Toaster } from "react-hot-toast";
import { City } from "./features/cities/components/City";

const Home = lazy(() => import("./Pages/Home"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const AppLayout = lazy(() => import("./layouts/AppLayout"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
const CityTour = lazy(() => import("./Pages/CityTour"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  {
    path: "/app",
    element: (
      <ProtectedAppPage>
        <AppLayout />
      </ProtectedAppPage>
    ),
    children: [
      { index: true, element: <Navigate replace to="visited" /> },
      {
        path: "visited",
        element: <Visited />,
        children: [
          { index: true, element: <Navigate replace to="visitedCities" /> },
          { path: "visitedCities", element: <VisitedCities /> },
          { path: "visitedCountries", element: <VisitedCountries /> },
        ],
      },
      {
        path: "planned",
        element: <Planned />,
        children: [
          { index: true, element: <Navigate replace to="plannedCities" /> },
          { path: "plannedCities", element: <PlannedCities /> },
          { path: "plannedCountries", element: <PlannedCountries /> },
        ],
      },
      { path: "form", element: <Form /> },
      { path: "cities/:cityId", element: <City /> },
    ],
  },
  {
    path: "/cities/:cityName",
    element: <CityTour />,
  },

  { path: "*", element: <PageNotFound /> },
]);

function App() {
  const dispatch = useAppDispatch();
  const { currentUser, users } = useAppSelector((state) => state.auth);
  const { isFetching } = useAppSelector((state) => state.cities);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  useEffect(() => {
    if (currentUser && !isFetching) {
      dispatch(fetchCities(currentUser.id));
    }
  }, [dispatch, currentUser, isFetching]);

  useEffect(() => {
    const registerSuccess = localStorage.getItem("registerSuccess");
    if (registerSuccess) {
      toast.success("Registration successful!");
      localStorage.removeItem("registerSuccess");
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          success: {
            iconTheme: {
              primary: "#4ade80",
              secondary: "#f0fdf4",
            },
          },
          error: {
            iconTheme: {
              primary: "#f87171",
              secondary: "#fef2f2",
            },
          },
        }}
      />
    </>
  );
}

export default App;
