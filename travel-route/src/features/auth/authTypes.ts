import type { CitiesType } from "../cities/citiesTypes";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cities: CitiesType;
}

export interface AuthState {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
