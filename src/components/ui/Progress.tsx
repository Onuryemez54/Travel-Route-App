import { useAppSelector } from "../../app/hooks";

export const Progress = () => {
  const currentCity = useAppSelector((state) => state.cities.currentCity);
  const todoList = currentCity?.todoList ?? [];
  const completed = todoList.filter((todo) => todo.completed).length;
  const total = todoList.length;
  const averageCompletedTodos =
    todoList.length > 0 ? Math.round((completed / todoList.length) * 100) : 0;

  return (
    <div className=" flex flex-col items-center justify-center gap-2 my-3 ">
      <progress
        className="w-full h-4 rounded-lg appearance-none"
        value={completed}
        max={total}
      ></progress>
      <div className="flex gap-2 items-center justify-between text-sm">
        {completed === total ? (
          <p className="text-green-500 font-semibold">
            All To-dos Completed!{" "}
            <span role="img" aria-label="party popper">
              🎉
            </span>
          </p>
        ) : (
          <p className="font-semibold">
            Completed To-do{" "}
            <strong>
              {completed}/{total}
            </strong>{" "}
            <span>
              <strong>({`${averageCompletedTodos} %`})</strong>
            </span>
          </p>
        )}
      </div>
    </div>
  );
};
