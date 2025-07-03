import { createTestStore } from "../../../test/mocks/testStore";
import { toggleTodoInCity } from "../citiesSlice";

describe("toggleTodoInCity reducer", () => {
  it("should toggle the 'completed' status of a todo", () => {
    const store = createTestStore();

    const stateBefore = store.getState().cities.currentCity;
    const todoId = stateBefore?.todoList?.[1]?.id;

    expect(todoId).toBeDefined();
    expect(stateBefore?.todoList?.[1].completed).toBe(false);

    store.dispatch(toggleTodoInCity(stateBefore!.id, todoId!));

    const stateAfter = store.getState().cities;

    expect(stateAfter.currentCity?.todoList?.[1].completed).toBe(true);
  });

  it("should do nothing if cityId doesn't match currentCity", () => {
    const store = createTestStore();

    const originalState = store.getState().cities.currentCity;

    store.dispatch(toggleTodoInCity("wrong-city-id", "todo-1"));

    const updatedState = store.getState().cities.currentCity;

    expect(updatedState).toEqual(originalState);
  });
});
