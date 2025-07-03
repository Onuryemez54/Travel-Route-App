import { renderHook, act } from "@testing-library/react";
import { useLocalStorageTodos } from "./useLocalStorageTodos";
import type { TodoItem } from "./useTodoList";

describe("useLocalStorageTodos", () => {
  const key = "test-todos";
  const initialTodos: TodoItem[] = [
    { id: "1", text: "Learn Vitest", completed: false },
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize from initial state if localStorage is empty", () => {
    const { result } = renderHook(() =>
      useLocalStorageTodos(initialTodos, key)
    );

    expect(result.current[0]).toEqual(initialTodos);
    expect(result.current[0]).toHaveLength(1);
  });

  it("should update localStorage when todos are updated", () => {
    const { result } = renderHook(() =>
      useLocalStorageTodos(initialTodos, key)
    );

    const newTodo: TodoItem = {
      id: "2",
      text: "Test localStorage",
      completed: false,
    };

    act(() => {
      result.current[1]((prev: TodoItem[]) => [...prev, newTodo]);
    });

    expect(result.current[0]).toContainEqual(newTodo);
    expect(result.current[0]).toHaveLength(2);
  });

  it("should load from localStorage if data exists", () => {
    const stored = [{ id: "9", text: "From LS", completed: true }];
    localStorage.setItem(key, JSON.stringify(stored));

    const { result } = renderHook(() =>
      useLocalStorageTodos(initialTodos, key)
    );

    expect(result.current[0]).toEqual(stored);
    expect(result.current[0]).toHaveLength(1);
  });

  it("should update localStorage when todos are modified", () => {
    const { result } = renderHook(() =>
      useLocalStorageTodos(initialTodos, key)
    );

    act(() => {
      result.current[1]((prev: TodoItem[]) =>
        prev.map((todo) => ({ ...todo, completed: !todo.completed }))
      );
    });

    expect(result.current[0][0].completed).toBe(true);
  });
});
