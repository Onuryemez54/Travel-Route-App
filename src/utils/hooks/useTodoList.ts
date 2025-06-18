import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useLocalStorageTodos } from "./useLocalStorageTodos";

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export const useTodoList = (initialTodos: TodoItem[] = [], cityId: string) => {
  const [todoInput, setTodoInput] = useState("");

  const storageKey = `todos-${cityId}`;
  const [todos, setTodos] = useLocalStorageTodos(initialTodos, storageKey);

  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault();
    if (todoInput.trim() === "") return;

    if (todos.some((todo: TodoItem) => todo.text === todoInput.trim())) {
      toast.error("This todo item already exists.");
      return;
    }

    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      text: todoInput.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTodoInput("");
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev: TodoItem[]) => prev.filter((todo) => todo.id !== id));
  };

  const handleChangeTodoText = (id: string, newText: string) => {
    setTodos((prev: TodoItem[]) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  return {
    todoInput,
    setTodoInput,
    todos,
    setTodos,
    handleAddTodo,
    handleDeleteTodo,
    handleChangeTodoText,
  };
};
