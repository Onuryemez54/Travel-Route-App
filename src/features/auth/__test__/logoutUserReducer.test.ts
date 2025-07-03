import { createTestStore } from "../../../test/mocks/testStore";
import { logoutUser } from "../authSlice";

describe("logoutUser reducer", () => {
  it("should reset auth state", () => {
    const store = createTestStore();

    store.dispatch(logoutUser());

    const state = store.getState().auth;

    expect(state.currentUser).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
