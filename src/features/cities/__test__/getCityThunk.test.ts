import axiosInstance from "../../../api/axiosInstance";
import MockAdapter from "axios-mock-adapter";
import { createTestStore } from "../../../test/mocks/testStore";
import { getCity } from "../citiesSlice";
import {
  mockCityPlanned,
  mockCityVisited,
} from "../../../test/mocks/mockCities";

const mock = new MockAdapter(axiosInstance);

beforeEach(() => {
  mock.reset();
});

describe("getCity thunk", () => {
  it("should find city by id in planned list and fulfill", async () => {
    const store = createTestStore();

    const result = await store.dispatch(getCity(mockCityVisited.id));

    const state = store.getState().cities;

    expect(result.type).toBe("cities/getCity/fulfilled");
    expect(state.currentCity?.id).toBe("4");
    expect(state.currentCity?.cityName).toBe("Eskişehir");
    expect(state.error).toBeNull();
  });

  it("should find city by id in visited list and fulfill", async () => {
    const store = createTestStore();

    const result = await store.dispatch(getCity(mockCityPlanned.id));

    const state = store.getState().cities;

    expect(result.type).toBe("cities/getCity/fulfilled");
    expect(state.currentCity?.id).toBe(mockCityPlanned.id);
    expect(state.error).toBeNull();
  });

  it("should reject if city not found in either list", async () => {
    const store = createTestStore();

    const result = await store.dispatch(getCity("non-existent-id"));

    const state = store.getState().cities;

    expect(result.type).toBe("cities/getCity/rejected");
    expect(state.error).toBe("City not found");
  });
});
