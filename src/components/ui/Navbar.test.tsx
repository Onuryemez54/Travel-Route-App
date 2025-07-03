import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Navbar } from "./Navbar";

const renderWithAuth = (isAuthenticated: boolean) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
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
            visited: [],
            planned: [],
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
              visited: [],
              planned: [],
            },
          },
        ],
        isAuthenticated: isAuthenticated,
        isLoading: false,
        error: null,
      },
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </Provider>
  );
};

describe("Navbar Component", () => {
  it("displays the correct links when not authenticated", () => {
    renderWithAuth(false);
    const navItems = screen.getByTestId("navItems");
    expect(navItems).toBeInTheDocument();
    const links = ["About", "Pricing", "Login", "Register"];
    links.forEach((link) => {
      const navLink = within(navItems).getByText(link);
      expect(navLink).toBeInTheDocument();
    });

    const discoverLink = within(navItems).queryByText("Discover");
    expect(discoverLink).not.toBeInTheDocument();
    const logoutButton = within(navItems).queryByRole("button", {
      name: "Logout",
    });
    expect(logoutButton).not.toBeInTheDocument();
  });

  it("displays the correct links when  authenticated", () => {
    renderWithAuth(true);
    const navItems = screen.getByTestId("navItems");
    expect(navItems).toBeInTheDocument();

    const links = ["About", "Pricing", "Discover"];
    links.forEach((link) => {
      const navLink = within(navItems).getByText(link);
      expect(navLink).toBeInTheDocument();
    });

    const logoutButton = within(navItems).getByRole("button", {
      name: "Logout",
    });
    expect(logoutButton).toBeInTheDocument();

    const loginLink = within(navItems).queryByText("Login");
    expect(loginLink).not.toBeInTheDocument();
    const registerLink = within(navItems).queryByText("Register");
    expect(registerLink).not.toBeInTheDocument();
  });
});
