import { useEffect, useState } from "react";
import type { TodoItem } from "./useTodoList";

export const useLocalStorageTodos = (initialState: TodoItem[], key: string) => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem(key);
    return storedTodos ? JSON.parse(storedTodos) : initialState;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(todos));
  }, [todos, key]);

  return [todos, setTodos];
};
