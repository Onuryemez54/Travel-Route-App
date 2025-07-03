import type { TodoItem } from "../../utils/hooks/useTodoList";

export interface City {
  id: string;
  cityName: string;
  countryName: string;
  countryCode: string;
  date: Date;
  notes?: string;
  position: {
    lat: string;
    lng: string;
  };
  category: "planned" | "visited";
  todoList?: TodoItem[];
  isFavorite?: boolean;
}

export interface CitiesType {
  planned: City[];
  visited: City[];
}

export interface CitiesState {
  cities: CitiesType;
  currentCity: City | null;
  isLoading: boolean;
  error: string | null;
  isFetching: boolean;
}
