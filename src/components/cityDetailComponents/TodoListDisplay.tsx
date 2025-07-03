import { useState } from "react";
import type { TodoItem } from "../../utils/hooks/useTodoList";

interface TodoListDisplayProps {
  todos: TodoItem[];
  mode?: "view" | "edit" | "plan";
  onDelete?: (todoId: string) => void;
  onChange?: (todoId: string, newText: string) => void;
  onToggle?: (todoId: string) => void;
}

export const TodoListDisplay = ({
  todos,
  onDelete,
  mode,
  onChange,
  onToggle,
}: TodoListDisplayProps) => {
  const [displayEdit, setDisplayEdit] = useState(false);

  return (
    <div className="w-full mt-2 text-white">
      <ul className="w-full max-w-md px-3 py-2 space-y-2 divide-y-2 divide-green-400 rounded-lg shadow-md bg-gray-800/90">
        {todos.map((todo, i: number) => (
          <li
            key={todo.id}
            className="py-1 border-green-400 rounded-lg last:border-b-2 "
          >
            {mode === "edit" && (
              <div className="flex items-center justify-between">
                <div className="space-x-2">
                  <span className="text-sm font-bold">{i + 1}.</span>
                  {displayEdit ? (
                    <input
                      data-testid="todo-edit"
                      value={todo.text}
                      onChange={(e) =>
                        onChange && onChange(todo.id, e.target.value)
                      }
                      className="text-white capitalize focus:outline-0"
                    />
                  ) : (
                    <span
                      className={`px-2 capitalize text-md ${
                        todo.completed ? "line-through  text-green-500/80 " : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDisplayEdit((p) => !p)}
                    className="text-orange-400 transition-colors duration-300 cursor-pointer hover:text-orange-600 "
                  >
                    Edit
                  </button>
                  <button
                    title="Remove todo"
                    onClick={() => onDelete && onDelete(todo.id)}
                    className="text-lg font-semibold text-red-500 transition-colors duration-300 cursor-pointer hover:text-red-700"
                  >
                    X
                  </button>
                </div>
              </div>
            )}

            {mode === "plan" && (
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onToggle && onToggle(todo.id)}
                  className="w-5 h-5 transition-colors duration-300 cursor-pointer accent-green-400 focus:ring-2 focus:ring-green-400"
                />
                <span className="font-bold text-md">{i + 1}.</span>
                <span
                  className={`px-2 capitalize text-md ${
                    todo.completed ? "line-through opacity-80 " : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>
            )}

            {mode === "view" && (
              <div className="flex items-center gap-5">
                <span className="font-bold text-md">{i + 1}.</span>
                <span className="capitalize text-md ">{todo.text}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
