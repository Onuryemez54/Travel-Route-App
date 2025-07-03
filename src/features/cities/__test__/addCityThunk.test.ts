import axiosInstance from "../../../api/axiosInstance";
import MockAdapter from "axios-mock-adapter";
import {
  mockCities,
  mockCityPlanned,
  mockCityVisited,
} from "../../../test/mocks/mockCities";
import { createTestStore } from "../../../test/mocks/testStore";
import { addCity } from "../citiesSlice";

const mock = new MockAdapter(axiosInstance);

beforeEach(() => {
  mock.reset();
});

describe("addCity thunk", () => {
  it("should add a new city to the correct category", async () => {
    const newCity = mockCities[0];

    mock.onPatch("/users/12345").reply(200, {
      cities: {
        planned: [mockCityPlanned, newCity],
        visited: [mockCityVisited],
      },
    });

    const store = createTestStore();
    const result = await store.dispatch(addCity({ userId: "12345", newCity }));

    const state = store.getState().cities;

    expect(result.type).toBe("cities/addCity/fulfilled");
    expect(state.cities.planned.length).toBe(2);
    expect(state.currentCity?.id).toBe("1");
    expect(state.currentCity?.cityName).toBe("İstanbul");
  });

  it("should reject if city already exists", async () => {
    const store = createTestStore();

    const result = await store.dispatch(
      addCity({ userId: "12345", newCity: mockCityPlanned })
    );

    const state = store.getState().cities;

    expect(result.type).toBe("cities/addCity/rejected");
    expect(state.error).toBe("City already exists in planned or visited list");
  });
});
