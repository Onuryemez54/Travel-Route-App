import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { saveTodoList } from "../../features/cities/citiesSlice";
import toast from "react-hot-toast";
import type { MouseEvent } from "react";
import type { TodoItem } from "./useTodoList";

interface SaveTodosProps {
  userId: string;
  cityId: string;
  todoList: TodoItem[];
}

export const useSaveTodos = ({ userId, cityId, todoList }: SaveTodosProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSaveTodos = async (e: MouseEvent) => {
    e.preventDefault();

    try {
      await dispatch(
        saveTodoList({
          userId,
          cityId,
          todoList,
        })
      ).unwrap();
      toast.success("Todos saved successfully!");
      localStorage.removeItem(`todos-${cityId}`);
      navigate(`/app/cities/${cityId}`, { replace: true });
    } catch (error) {
      toast.error(error as string);
    }
  };

  return { handleSaveTodos };
};
