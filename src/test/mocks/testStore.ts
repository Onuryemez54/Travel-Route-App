import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import citiesReducer from "../../features/cities/citiesSlice";
import { mockCityPlanned, mockCityVisited } from "./mockCities";

export const createTestStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      cities: citiesReducer,
    },
    preloadedState: {
      auth: {
        currentUser: {
          id: "12345",
          firstName: "Test",
          lastName: "User",
          email: "test@example.com",
          password: "password123",
          cities: {
            visited: [mockCityVisited],
            planned: [mockCityPlanned],
          },
        },
        users: [
          {
            id: "12345",
            firstName: "Test",
            lastName: "User",
            email: "test@example.com",
            password: "password123",
            cities: {
              visited: [mockCityVisited],
              planned: [mockCityPlanned],
            },
          },
        ],
        isAuthenticated: true,
        isLoading: false,
        error: null,
      },
      cities: {
        currentCity: mockCityPlanned,
        cities: {
          visited: [mockCityVisited],
          planned: [mockCityPlanned],
        },
        isLoading: false,
        error: null,
        isFetching: true,
      },
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
