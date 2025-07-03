import axiosInstance from "../../../api/axiosInstance";
import MockAdapter from "axios-mock-adapter";
import {
  mockCityPlanned,
  mockCityVisited,
} from "../../../test/mocks/mockCities";
import { createTestStore } from "../../../test/mocks/testStore";
import { deleteCity } from "../citiesSlice";

const mock = new MockAdapter(axiosInstance);

beforeEach(() => {
  mock.reset();
});

describe("deleteCity thunk", () => {
  it("should delete a city from planned or visited", async () => {
    mock.onPatch("/users/12345").reply(200, {
      cities: {
        planned: [],
        visited: [mockCityVisited],
      },
    });

    const store = createTestStore();
    const result = await store.dispatch(
      deleteCity({ userId: "12345", cityId: mockCityPlanned.id })
    );

    const state = store.getState().cities;

    expect(result.type).toBe("cities/deleteCity/fulfilled");
    expect(state.cities.planned.length).toBe(0);
    expect(state.currentCity).toBeNull();
  });

  it("should reject if city not found", async () => {
    const store = createTestStore();

    const result = await store.dispatch(
      deleteCity({ userId: "12345", cityId: "non-existent-id" })
    );

    const state = store.getState().cities;

    expect(result.type).toBe("cities/deleteCity/rejected");
    expect(state.error).toBe("City not found in either list");
  });
});
