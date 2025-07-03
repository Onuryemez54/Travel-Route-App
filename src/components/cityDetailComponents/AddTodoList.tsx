import { Button } from "../ui/Button";
import { useAppSelector } from "../../app/hooks";
import { TodoListDisplay } from "./TodoListDisplay";
import { useTodoList } from "../../utils/hooks/useTodoList";
import { useSaveTodos } from "../../utils/hooks/useSaveTodos";
import { TodoForm } from "./TodoForm";

export const AddTodoList = () => {
  const user = useAppSelector((state) => state.auth.currentUser);
  const currentCity = useAppSelector((state) => state.cities.currentCity);

  const {
    todoInput,
    setTodoInput,
    todos,
    handleAddTodo,
    handleDeleteTodo,
    handleChangeTodoText,
  } = useTodoList(currentCity?.todoList || [], currentCity?.id || "");

  const { handleSaveTodos } = useSaveTodos({
    userId: user?.id || "",
    cityId: currentCity?.id || "",
    todoList: todos,
  });

  return (
    <div className="flex flex-col items-center gap-2 text-white slide-in-bottom-nearer">
      <TodoForm
        todo={todoInput}
        setTodo={setTodoInput}
        onAddTodo={handleAddTodo}
      />
      {todos.length > 0 && (
        <>
          <TodoListDisplay
            mode="edit"
            todos={todos}
            onDelete={handleDeleteTodo}
            onChange={handleChangeTodoText}
          />
          <Button type="submitTodo" click={handleSaveTodos}>
            Save Todos
          </Button>
        </>
      )}
    </div>
  );
};
