import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CitiesState, CitiesType, City } from "./citiesTypes";
import axiosInstance from "../../api/axiosInstance";
import type { RootState } from "../../app/rootTypes";
import type { TodoItem } from "../../utils/hooks/useTodoList";
const initialState: CitiesState = {
  cities: {
    planned: [],
    visited: [],
  },
  currentCity: null,
  isLoading: false,
  error: null,
  isFetching: false,
};

export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/users/${userId}`);
      return res.data.cities as CitiesType;
    } catch (err) {
      let message = "Failed to fetch cities";
      if (err instanceof Error) {
        message = err.message;
      }
      return rejectWithValue(message);
    }
  }
);

export const getCity = createAsyncThunk(
  "cities/getCity",
  async (cityId: string, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { planned, visited } = state.cities.cities;
    const currentCity = [...planned, ...visited].find(
      (city) => city.id === cityId
    );
    if (!currentCity) {
      return rejectWithValue("City not found");
    }

    return currentCity;
  }
);

export const addCity = createAsyncThunk(
  "cities/addCity",
  async (
    { userId, newCity }: { userId: string; newCity: City },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as RootState;
    const { planned, visited } = state.cities.cities;

    const cityExists = [...planned, ...visited].some(
      (city) =>
        city.cityName?.toLowerCase() === newCity.cityName?.toLowerCase() &&
        new Date(city.date).toDateString() ===
          new Date(newCity.date).toDateString()
    );

    if (cityExists) {
      return rejectWithValue("City already exists in planned or visited list");
    }

    const updatedCities: CitiesType = {
      planned: newCity.category === "planned" ? [...planned, newCity] : planned,
      visited: newCity.category === "visited" ? [...visited, newCity] : visited,
    };

    try {
      const res = await axiosInstance.patch(`/users/${userId}`, {
        cities: updatedCities,
      });
      return {
        updatedCities: res.data.cities as CitiesType,
        currentCity: newCity,
      };
    } catch (err) {
      let message = "Failed to add city";
      if (err instanceof Error) {
        message = err.message;
      }
      return rejectWithValue(message);
    }
  }
);

export const deleteCity = createAsyncThunk(
  "cities/deleteCity",
  async (
    { userId, cityId }: { userId: string; cityId: string },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const { planned, visited } = state.cities.cities;
    const isInPlanned = planned.some((city) => city.id === cityId);
    const isInVisited = visited.some((city) => city.id === cityId);

    if (!isInPlanned && !isInVisited) {
      return rejectWithValue("City not found in either list");
    }

    const updatedCities = {
      planned: isInPlanned ? planned.filter((c) => c.id !== cityId) : planned,
      visited: isInVisited ? visited.filter((c) => c.id !== cityId) : visited,
    };

    try {
      await axiosInstance.patch(`users/${userId}`, { cities: updatedCities });
      return updatedCities;
    } catch (err) {
      let message = "Failed to delete city";
      if (err instanceof Error) {
        message = err.message;
      }
      return rejectWithValue(message);
    }
  }
);

export const saveTodoList = createAsyncThunk(
  "cities/updateTodoList",
  async (
    {
      userId,
      cityId,
      todoList,
    }: { userId: string; cityId: string; todoList: TodoItem[] },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const { visited, planned } = state.cities.cities;
    const currentCity = planned.find((city) => city.id === cityId);

    if (!currentCity) {
      return rejectWithValue("City not found");
    }

    const updatedCity = { ...currentCity, todoList };

    const updatedCities: CitiesType = {
      planned: planned.map((city) => (city.id === cityId ? updatedCity : city)),
      visited,
    };

    try {
      await axiosInstance.patch(`users/${userId}`, { cities: updatedCities });
      return { updatedCities, currentCity: updatedCity };
    } catch (err) {
      let message = "Failed to update todo list";
      if (err instanceof Error) {
        message = err.message;
      }
      return rejectWithValue(message);
    }
  }
);

export const moveCityToVisited = createAsyncThunk(
  "cities/moveToVisited",
  async (
    { userId, currentCity }: { userId: string; currentCity: City },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const { planned, visited } = state.cities.cities;

    const cityToMove = planned.find((city) => city.id === currentCity.id);
    if (!cityToMove) {
      return rejectWithValue("City not found in planned list.");
    }

    const newCurrentCity = {
      ...cityToMove,
      category: "visited" as const,
      todoList: currentCity.todoList?.filter((todo) => todo.completed) || [],
      date: new Date(),
    };

    const updatedPlanned = planned.filter((city) => city.id !== currentCity.id);
    const updatedVisited = [...visited, newCurrentCity];

    const updatedCities: CitiesType = {
      planned: updatedPlanned,
      visited: updatedVisited,
    };

    try {
      await axiosInstance.patch(`/users/${userId}`, {
        cities: updatedCities,
      });
      return { updatedCities, newCurrentCity };
    } catch (err) {
      let message = "Failed to move city to visited.";
      if (err instanceof Error) {
        message = err.message;
      }
      return rejectWithValue(message);
    }
  }
);

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    resetCitiesState: (state) => {
      state.cities = initialState.cities;
      state.currentCity = initialState.currentCity;
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
      state.isFetching = initialState.isFetching;
    },
    toggleFavoriteCity: (state, action) => {
      const { cityId } = action.payload;
      const visited = state.cities.visited;
      const updatedVisited = visited.map((city) =>
        city.id === cityId ? { ...city, isFavorite: !city.isFavorite } : city
      );
      state.cities.visited = updatedVisited;
      state.currentCity =
        state.currentCity && state.currentCity.id === cityId
          ? { ...state.currentCity, isFavorite: !state.currentCity.isFavorite }
          : state.currentCity;
    },
    toggleTodoInCity: {
      prepare: (cityId: string, todoId: string) => ({
        payload: { cityId, todoId },
      }),
      reducer: (
        state,
        action: PayloadAction<{ cityId: string; todoId: string }>
      ) => {
        const { cityId, todoId } = action.payload;
        const currentCity = state.currentCity;
        if (currentCity && currentCity.id === cityId && currentCity.todoList) {
          const updatedTodoList = currentCity.todoList.map((todo: TodoItem) =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
          );
          state.currentCity = { ...currentCity, todoList: updatedTodoList };
        }
      },
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCities
      .addCase(fetchCities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload;
        state.error = null;
        state.isFetching = true;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // getCity
      .addCase(getCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCity = action.payload;
        state.error = null;
      })
      .addCase(getCity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // addCity
      .addCase(addCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload.updatedCities;
        state.currentCity = action.payload.currentCity;
        state.error = null;
      })
      .addCase(addCity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCity.pending, (state) => {
        state.isLoading = true;
      })
      //  deleteCity
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload;
        state.currentCity = null;
        state.error = null;
      })
      .addCase(deleteCity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // saveTodoList
      .addCase(saveTodoList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveTodoList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload.updatedCities;
        state.currentCity = action.payload.currentCity;
        state.error = null;
      })
      .addCase(saveTodoList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // moveCityToVisited
      .addCase(moveCityToVisited.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(moveCityToVisited.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload.updatedCities;
        state.currentCity = action.payload.newCurrentCity;
        state.error = null;
      })
      .addCase(moveCityToVisited.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCitiesState, toggleFavoriteCity, toggleTodoInCity } =
  citiesSlice.actions;

export default citiesSlice.reducer;
