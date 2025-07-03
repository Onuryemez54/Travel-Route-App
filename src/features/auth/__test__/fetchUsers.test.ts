import axiosInstance from "../../../api/axiosInstance";
import MockAdapter from "axios-mock-adapter";
import { createTestStore } from "../../../test/mocks/testStore";
import { fetchUsers } from "../authSlice";

const mock = new MockAdapter(axiosInstance);

beforeEach(() => {
  mock.reset();
});

describe("fetchUsers thunk", () => {
  it("should fetch users and store them", async () => {
    const store = createTestStore();

    const users = [
      {
        id: "12345",
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        password: "password123",
        cities: { visited: [], planned: [] },
      },
    ];

    mock.onGet("/users").reply(200, users);

    const result = await store.dispatch(fetchUsers());

    const state = store.getState().auth;

    expect(result.type).toBe("auth/fetchUsers/fulfilled");
    expect(state.users.length).toBe(1);
    expect(state.users[0].email).toBe("test@example.com");
    expect(state.users[0].cities.visited).toEqual([]);
  });

  it("should handle fetchUsers failure", async () => {
    const store = createTestStore();

    mock.onGet("/users").reply(500);

    const result = await store.dispatch(fetchUsers());

    const state = store.getState().auth;
    expect(result.type).toBe("auth/fetchUsers/rejected");
    expect(state.error).toBeDefined();
  });
});
