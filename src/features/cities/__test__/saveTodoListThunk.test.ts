import axiosInstance from "../../../api/axiosInstance";
import MockAdapter from "axios-mock-adapter";
import {
  mockCityPlanned,
  mockCityVisited,
} from "../../../test/mocks/mockCities";
import { createTestStore } from "../../../test/mocks/testStore";
import { saveTodoList } from "../citiesSlice";

const mock = new MockAdapter(axiosInstance);

beforeEach(() => {
  mock.reset();
});

describe("saveTodoList", () => {
  it("should update todoList of a city", async () => {
    const updatedTodoList = [
      { id: "1", text: "Do something", completed: true },
    ];

    mock.onPatch("/users/12345").reply(200, {
      cities: {
        planned: [
          {
            ...mockCityPlanned,
            todoList: updatedTodoList,
          },
        ],
        visited: [mockCityVisited],
      },
    });

    const store = createTestStore();
    const result = await store.dispatch(
      saveTodoList({
        userId: "12345",
        cityId: mockCityPlanned.id,
        todoList: updatedTodoList,
      })
    );

    const state = store.getState().cities;
    expect(result.type).toBe("cities/saveTodoList/fulfilled");
    expect(state.currentCity?.todoList).toEqual(updatedTodoList);
  });

  it("should reject if city not found", async () => {
    const store = createTestStore();

    const result = await store.dispatch(
      saveTodoList({
        userId: "12345",
        cityId: "invalid-id",
        todoList: [],
      })
    );

    const state = store.getState().cities;
    expect(result.type).toBe("cities/saveTodoList/rejected");
    expect(state.error).toBe("City not found");
  });
});
