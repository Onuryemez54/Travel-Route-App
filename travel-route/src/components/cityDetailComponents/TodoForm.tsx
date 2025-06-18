import type { FormEvent } from "react";

interface TodoFormTypes {
  todo: string;
  setTodo: (value: string) => void;
  onAddTodo: (e: FormEvent) => void;
}

export const TodoForm = ({ todo, setTodo, onAddTodo }: TodoFormTypes) => {
  return (
    <form onSubmit={onAddTodo} className="w-full max-w-md">
      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        type="text"
        placeholder="Add a new todo..."
        className="px-4 py-2 font-semibold text-white text-sm transition-all duration-300 bg-gray-800/90 rounded-full placeholder:text-stone-400 w-40 focus:w-45 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent sm:w-46 sm:focus:w-56 "
      />
    </form>
  );
};
