import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../Login";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import * as authSlice from "../../features/auth/authSlice";

vi.mock("../../features/auth/authSlice", async () => {
  const actual = await vi.importActual("../../features/auth/authSlice");
  return {
    ...actual,
    loginUser: vi.fn(() => async () => Promise.resolve()),
  };
});

const renderLogin = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

describe("Login Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    renderLogin();
  });

  it("renders form elements", () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows validation errors when inputs are empty", async () => {
    const user = userEvent.setup();
    user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it("dispatches loginUser on valid form", async () => {
    const loginMock = authSlice.loginUser as unknown as ReturnType<
      typeof vi.fn
    >;

    const user = userEvent.setup();

    const loginButton = screen.getByRole("button", { name: /login/i });

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "123456");

    await user.click(loginButton);

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "123456",
      });
    });
  });

  it("toggles password visibility", async () => {
    const user = userEvent.setup();

    const passwordInput = screen.getByLabelText(/password/i);
    const toggleBtn = screen.getByRole("button", { name: /toggle/i });

    expect(passwordInput).toHaveAttribute("type", "password");

    await user.click(toggleBtn);

    expect(passwordInput).toHaveAttribute("type", "text");
  });
});
