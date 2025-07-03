import axiosInstance from "../../../api/axiosInstance";
import MockAdapter from "axios-mock-adapter";
import {
  mockCityPlanned,
  mockCityVisited,
} from "../../../test/mocks/mockCities";
import { createTestStore } from "../../../test/mocks/testStore";
import { toggleFavoriteCity } from "../citiesSlice";

const mock = new MockAdapter(axiosInstance);

beforeEach(() => {
  mock.reset();
});

describe("toggleFavoriteCity", () => {
  it("should toggle isFavorite of a visited city", async () => {
    const updatedCity = {
      ...mockCityVisited,
      isFavorite: !mockCityVisited.isFavorite,
    };

    mock.onPatch("/users/12345").reply(200, {
      cities: {
        visited: [updatedCity],
        planned: [mockCityPlanned],
      },
    });

    const store = createTestStore();

    const result = await store.dispatch(
      toggleFavoriteCity({
        userId: "12345",
        cityId: mockCityVisited.id,
      })
    );

    const state = store.getState().cities;
    expect(result.type).toBe("cities/toggleFavoriteCity/fulfilled");
    expect(state.currentCity?.isFavorite).toBe(true);
  });

  it("should reject if city not found in visited", async () => {
    const store = createTestStore();

    const result = await store.dispatch(
      toggleFavoriteCity({ userId: "12345", cityId: "invalid-id" })
    );

    const state = store.getState().cities;
    expect(result.type).toBe("cities/toggleFavoriteCity/rejected");
    expect(state.error).toBe("City not found in visited list.");
  });
});
