import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthState, User } from "./authTypes";
import axiosInstance from "../../api/axiosInstance";
import { type RootState } from "../../app/rootTypes";
import type { LoginFormInputs } from "../../Pages/Login";
import type { RegisterFormInputs } from "../../Pages/Register";

const initialState: AuthState = {
  users: [],
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "auth/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/users");
      return res.data as User[];
    } catch (err) {
      let message = "Failed to fetch users";
      if (err instanceof Error) {
        message = err.message;
      }
      return rejectWithValue(message);
    }
  }
);

export const addUser = createAsyncThunk(
  "auth/addUser",
  async (newUser: RegisterFormInputs, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const emailExists = state.auth.users.some(
      (user: User) => user.email === newUser.email
    );
    if (emailExists) {
      return rejectWithValue("Email already exists");
    }

    const updatedUser: User = {
      ...newUser,
      id: crypto.randomUUID(),
      cities: {
        visited: [],
        planned: [],
      },
    };

    try {
      const res = await axiosInstance.post("/users", updatedUser);
      return res.data as User;
    } catch (err) {
      let message = "Failed to add user";
      if (err instanceof Error) {
        message = err.message;
      }
      return rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userObject: LoginFormInputs, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const foundUser = state.auth.users.find(
      (user) =>
        user.email === userObject.email && user.password === userObject.password
    );
    if (!foundUser) {
      return rejectWithValue("Invalid email or password");
    }
    return foundUser as User;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchUsers section
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //addUser section
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload);
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      //loginUser section
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
