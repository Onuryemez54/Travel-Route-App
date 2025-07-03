import axiosInstance from "../../../api/axiosInstance";
import MockAdapter from "axios-mock-adapter";
import { createTestStore } from "../../../test/mocks/testStore";
import { loginUser } from "../authSlice";

const mock = new MockAdapter(axiosInstance);

beforeEach(() => {
  mock.reset();
});

describe("loginUser thunk", () => {
  it("should login successfully if credentials match", async () => {
    const store = createTestStore();

    const result = await store.dispatch(
      loginUser({
        email: "test@example.com",
        password: "password123",
      })
    );

    const state = store.getState().auth;

    expect(result.type).toBe("auth/loginUser/fulfilled");
    expect(state.currentUser?.email).toBe("test@example.com");
    expect(state.isAuthenticated).toBe(true);
  });

  it("should reject if credentials are invalid", async () => {
    const store = createTestStore();

    const result = await store.dispatch(
      loginUser({
        email: "wrong@example.com",
        password: "wrongpass",
      })
    );

    const state = store.getState().auth;
    expect(result.type).toBe("auth/loginUser/rejected");
    expect(state.error).toBe("Invalid email or password");
  });
});
