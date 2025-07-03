import axiosInstance from "../../../api/axiosInstance";
import MockAdapter from "axios-mock-adapter";
import { createTestStore } from "../../../test/mocks/testStore";
import { addUser } from "../authSlice";

const mock = new MockAdapter(axiosInstance);

beforeEach(() => {
  mock.reset();
});

describe("addUser thunk", () => {
  it("should add a new user if email does not exist", async () => {
    const store = createTestStore();

    const newUser = {
      firstName: "New",
      lastName: "User",
      email: "new@example.com",
      password: "pass123",
    };

    const createdUser = {
      ...newUser,
      id: "9999",
      cities: { planned: [], visited: [] },
    };

    mock.onPost("/users").reply(200, createdUser);

    const result = await store.dispatch(addUser(newUser));

    const state = store.getState().auth;
    expect(result.type).toBe("auth/addUser/fulfilled");
    expect(state.currentUser?.email).toBe("new@example.com");
    expect(state.isAuthenticated).toBe(true);
    expect(state.users.length).toBe(2);
  });

  it("should reject if email already exists", async () => {
    const store = createTestStore();

    const result = await store.dispatch(
      addUser({
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        password: "password123",
      })
    );

    const state = store.getState().auth;

    expect(result.type).toBe("auth/addUser/rejected");
    expect(state.error).toBe("Email already exists");
    expect(state.users.length).toBe(1);
  });
});
