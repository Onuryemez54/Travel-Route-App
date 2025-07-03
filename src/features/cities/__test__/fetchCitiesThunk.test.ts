import MockAdapter from "axios-mock-adapter";
import { mockCities, mockCityPlanned } from "../../../test/mocks/mockCities";
import { createTestStore } from "../../../test/mocks/testStore";
import { fetchCities } from "../citiesSlice";
import axiosInstance from "../../../api/axiosInstance";

const mock = new MockAdapter(axiosInstance);

beforeEach(() => {
  mock.reset();
});

describe("fetchCities thunk", () => {
  it("should fetch cities and update the state", async () => {
    const usedMockCİties = {
      planned: [mockCityPlanned],
      visited: mockCities,
    };

    mock.onGet("/users/12345").reply(200, { cities: usedMockCİties });

    const store = createTestStore();
    const result = await store.dispatch(fetchCities("12345"));

    const state = store.getState().cities;

    expect(result.type).toBe("cities/fetchCities/fulfilled");
    expect(state.cities.planned).toHaveLength(1);
    expect(state.cities.visited).toHaveLength(3);
    expect(state.error).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.isFetching).toBe(true);
  });

  it("should handle fetchCities error", async () => {
    mock.onGet("/users/12345").reply(500);

    const store = createTestStore();
    const result = await store.dispatch(fetchCities("12345"));
    const state = store.getState().cities;

    expect(result.type).toBe("cities/fetchCities/rejected");
    expect(state.error).toBeDefined();
    expect(state.isLoading).toBe(false);
    expect(state.cities.planned).toHaveLength(1);
    expect(state.cities.visited).toHaveLength(1);
  });
});
