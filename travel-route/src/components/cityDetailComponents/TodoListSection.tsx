import { useState } from "react";
import { AddTodoList } from "./AddTodoList";
import { useAppSelector } from "../../app/hooks";
import { UpdateTodoList } from "./UpdateTodoList";

export const TodoListSection = () => {
  const currentCity = useAppSelector((state) => state.cities.currentCity);
  const [showTodoList, setShowTodoList] = useState(false);
  const hasTodos = currentCity?.todoList && currentCity.todoList.length > 0;

  return (
    <div className="fixed z-20 flex flex-col items-center gap-2 top-50 sm:top-22 right-4">
      <button
        onClick={() => setShowTodoList((prev) => !prev)}
        className="font-semibold px-2.5 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-green-400 to-blue-400 hover:from-blue-400 hover:to-green-400  rounded-2xl text-white cursor-pointer hover:bg-blue-400 transition-colors duration-300"
      >
        {!hasTodos
          ? showTodoList
            ? "Hide Todo List"
            : "Create a todoList"
          : showTodoList
          ? `Hide Todo List of (${currentCity.cityName})`
          : `View Todo List of (${currentCity.cityName})`}
      </button>
      {!hasTodos && showTodoList ? (
        <AddTodoList />
      ) : (
        hasTodos && showTodoList && <UpdateTodoList />
      )}
    </div>
  );
};
