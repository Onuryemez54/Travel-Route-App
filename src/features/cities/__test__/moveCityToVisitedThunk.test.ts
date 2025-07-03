import axiosInstance from "../../../api/axiosInstance";
import MockAdapter from "axios-mock-adapter";
import {
  mockCityPlanned,
  mockCityVisited,
} from "../../../test/mocks/mockCities";
import { createTestStore } from "../../../test/mocks/testStore";
import { moveCityToVisited } from "../citiesSlice";

const mock = new MockAdapter(axiosInstance);

beforeEach(() => {
  mock.reset();
});

describe("moveCityToVisited", () => {
  it("should move city from planned to visited", async () => {
    const completedTodos = [
      {
        id: "todo1",
        text: "Visit the Eiffel Tower",
        completed: true,
      },
      {
        id: "todo2",
        text: "Explore the Louvre Museum",
        completed: false,
      },
    ];

    const newCurrentCity = {
      ...mockCityPlanned,
      category: "visited",
      todoList: completedTodos.filter((todo) => todo.completed),
      date: new Date(),
    };

    mock.onPatch("/users/12345").reply(200, {
      cities: {
        planned: [],
        visited: [mockCityVisited, newCurrentCity],
      },
    });

    const store = createTestStore();

    const result = await store.dispatch(
      moveCityToVisited({
        userId: "12345",
        currentCity: mockCityPlanned,
      })
    );

    const state = store.getState().cities;

    expect(result.type).toBe("cities/moveToVisited/fulfilled");
    expect(state.currentCity?.category).toBe("visited");
    expect(state.cities.visited.some((c) => c.id === mockCityPlanned.id)).toBe(
      true
    );
    expect(state.currentCity?.todoList).toEqual(
      completedTodos.filter((todo) => todo.completed)
    );
    expect(state.currentCity?.todoList?.length).toBe(1);
  });

  it("should reject if city not in planned", async () => {
    const store = createTestStore();

    const result = await store.dispatch(
      moveCityToVisited({
        userId: "12345",
        currentCity: {
          ...mockCityPlanned,
          id: "nonexistent",
        },
      })
    );

    const state = store.getState().cities;

    expect(result.type).toBe("cities/moveToVisited/rejected");
    expect(state.error).toBe("City not found in planned list.");
  });
});
