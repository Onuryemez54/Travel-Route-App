import { useAppSelector } from "../../app/hooks";
import { Button } from "../ui/Button";
import { TodoListDisplay } from "./TodoListDisplay";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useTodoList } from "../../utils/hooks/useTodoList";
import { TodoForm } from "./TodoForm";
import { useSaveTodos } from "../../utils/hooks/useSaveTodos";

export const UpdateTodoList = () => {
  const user = useAppSelector((state) => state.auth.currentUser);
  const currentCity = useAppSelector((state) => state.cities.currentCity);

  const {
    todoInput,
    setTodoInput,
    todos,
    handleAddTodo,
    handleDeleteTodo: handleDeleteTodoForUpdate,
    handleChangeTodoText: handleUpdateTodoText,
  } = useTodoList(currentCity?.todoList || [], currentCity?.id || "");

  const hasTodos = todos.length > 0;

  const { handleSaveTodos: handleUpdateTodos } = useSaveTodos({
    userId: user?.id || "",
    cityId: currentCity?.id || "",
    todoList: todos,
  });

  return (
    <>
      <div className="flex flex-col items-center  gap-3 ">
        {hasTodos && (
          <TodoListDisplay
            mode="edit"
            todos={todos}
            onChange={handleUpdateTodoText}
            onDelete={handleDeleteTodoForUpdate}
          />
        )}
        <TodoForm
          todo={todoInput}
          setTodo={setTodoInput}
          onAddTodo={handleAddTodo}
        />
        {!hasTodos && (
          <>
            <span className="px-3 py-2 text-white rounded-lg shadow-2xl  bg-orange-500/80">
              Please Update
            </span>
            <span className="text-orange-500">
              <MdOutlineKeyboardArrowDown size={30} />
            </span>
          </>
        )}
        <Button type="submitTodo" click={handleUpdateTodos}>
          Update Todos
        </Button>
      </div>
    </>
  );
};
