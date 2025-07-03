import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../Register";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import * as authSlice from "../../features/auth/authSlice";

vi.mock("../../features/auth/authSlice", async () => {
  const actual = await vi.importActual("../../features/auth/authSlice");
  return {
    ...actual,
    addUser: vi.fn(() => async () => Promise.resolve()),
  };
});

const renderRegister = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    </Provider>
  );

describe("Register Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    renderRegister();
  });

  it("renders form inputs and button", () => {
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors when fields are empty", async () => {
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    const user = userEvent.setup();
    const addUserMock = authSlice.addUser as unknown as ReturnType<
      typeof vi.fn
    >;

    await user.type(screen.getByLabelText(/first name/i), "Onur");
    await user.type(screen.getByLabelText(/last name/i), "Yemez");
    await user.type(screen.getByLabelText(/email/i), "onur@example.com");
    await user.type(screen.getByLabelText(/password/i), "123456");

    await user.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(addUserMock).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(addUserMock).toHaveBeenCalledWith({
        firstName: "Onur",
        lastName: "Yemez",
        email: "onur@example.com",
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
