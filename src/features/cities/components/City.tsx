import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect } from "react";
import {
  getCity,
  moveCityToVisited,
  toggleFavoriteCity,
  toggleTodoInCity,
} from "../citiesSlice";
import { countryCodeToFlagSrc, formatDate } from "../../../utils/helpers";
import { Spinner } from "../../../components/ui/Spinner";
import { Button } from "../../../components/ui/Button";
import { useUrlPosition } from "../../../utils/hooks/useUrlPosition";
import { TodoListDisplay } from "../../../components/cityDetailComponents/TodoListDisplay";
import { Progress } from "../../../components/ui/Progress";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { Message } from "../../../components/ui/Message";
import { useSaveTodos } from "../../../utils/hooks/useSaveTodos";

export const City = () => {
  const { cityId } = useParams();
  const [lat, lng] = useUrlPosition();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentCity, isLoading, error } = useAppSelector(
    (state) => state.cities
  );
  const user = useAppSelector((state) => state.auth.currentUser);
  const category = currentCity?.category;
  const todoList = currentCity?.todoList ?? [];
  const completedCount = todoList.filter((todo) => todo.completed).length;

  useEffect(() => {
    if (!cityId) return;
    if (currentCity?.id !== cityId) {
      dispatch(getCity(cityId));
    }
  }, [dispatch, cityId, currentCity?.id]);

  const handleToggleTodo = (todoId: string) => {
    if (!currentCity?.todoList) return;

    dispatch(toggleTodoInCity(currentCity.id, todoId));
  };

  const handleMoveToCity = () => {
    if (!currentCity) return;

    dispatch(
      moveCityToVisited({ userId: user?.id || "", currentCity: currentCity })
    );
    localStorage.removeItem(`todos-${currentCity.id}`);
    navigate(`/app`, { replace: true });
  };

  const { handleSaveTodos } = useSaveTodos({
    userId: user?.id || "",
    cityId: currentCity?.id || "",
    todoList: currentCity?.todoList || [],
  });

  if (isLoading) return <Spinner />;

  if (error) return <Message message={error} />;

  return (
    <div className="px-3 py-1 ">
      <div className="relative flex flex-col items-center justify-center w-full gap-3 px-6 py-4 mx-auto mt-6 bg-gray-800 shadow rounded-xl text-stone-300">
        {currentCity?.category === "visited" && (
          <span
            className={`absolute top-3 right-3 cursor-pointer ${
              currentCity.isFavorite ? "text-red-600" : "text-stone-200/80"
            } `}
            onClick={() =>
              dispatch(
                toggleFavoriteCity({
                  userId: user?.id || "",
                  cityId: currentCity.id,
                })
              )
            }
          >
            {currentCity.isFavorite ? (
              <MdOutlineFavorite size={30} />
            ) : (
              <MdFavoriteBorder size={25} />
            )}
          </span>
        )}
        <div className="flex items-center gap-3">
          {currentCity?.countryCode && (
            <img
              src={countryCodeToFlagSrc(currentCity.countryCode)}
              alt="flag"
              className="w-8 h-6 rounded shadow"
            />
          )}
          <h2 className="text-xl font-bold text-white">
            {currentCity?.cityName}
          </h2>
        </div>

        <div className="flex gap-3 my-3 ">
          <h6 className="text-md text-stone-400">
            I {category === "visited" ? "went" : "will go"} to{" "}
            <strong className="text-stone-100">{currentCity?.cityName}</strong>{" "}
            on
          </h6>
          {currentCity?.date && (
            <p className="font-bold text-orange-300 text-md">
              {formatDate(currentCity.date)}
            </p>
          )}
        </div>

        {currentCity?.notes && (
          <div className="w-full max-w-2xl px-4 py-3 bg-gray-700 rounded-lg shadow-lg">
            <h6 className="mb-1 text-sm font-semibold text-stone-400">
              Your notes
            </h6>
            <p className="overflow-auto text-stone-200">{currentCity.notes}</p>
          </div>
        )}

        <div className="my-6 text-center 2xl:text-left">
          <Button
            to={`/cities/${currentCity?.cityName}?lat=${lat}&lng=${lng}`}
            type="secondary"
          >
            Discover the City
          </Button>
        </div>

        <div>
          <h6 className="mb-1 text-sm text-stone-400">Learn more</h6>
          <a
            href={`https://en.wikipedia.org/wiki/${currentCity?.cityName}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-blue-400 transition hover:text-amber-400 hover:underline"
          >
            Check out {currentCity?.cityName} on Wikipedia →
          </a>
        </div>

        {currentCity?.todoList &&
          currentCity.todoList.length > 0 &&
          currentCity?.category === "planned" && (
            <div className="flex flex-col items-center gap-2 justify-center w-full shadow-2xl text-">
              <h3 className="font-semibold text-center text-md text-stone-200">
                My To-Do List
              </h3>
              <TodoListDisplay
                onToggle={handleToggleTodo}
                mode="plan"
                todos={currentCity?.todoList}
              />
              <Button type="submitTodo" click={handleSaveTodos}>
                Save Changes
              </Button>
              <div className="flex flex-col items-center gap-2 mt-4">
                <Progress />
                {completedCount > 0 && (
                  <Button type="finish" click={handleMoveToCity}>
                    Finish Trip
                  </Button>
                )}
              </div>
            </div>
          )}
        {currentCity?.todoList &&
          currentCity.todoList.length > 0 &&
          currentCity?.category === "visited" && (
            <div className="flex flex-col items-center justify-center w-full shadow-2xl">
              <h3 className="font-bold text-center">My experiences</h3>
              <TodoListDisplay mode="view" todos={currentCity?.todoList} />
            </div>
          )}
      </div>
    </div>
  );
};
