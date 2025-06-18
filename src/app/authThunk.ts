import type { AppDispatch } from "./rootTypes";
import { logoutUser } from "../features/auth/authSlice";
import { persistor } from "./store";

export const logoutUserThunk = () => (dispatch: AppDispatch) => {
  dispatch(logoutUser());
  persistor.purge();
};
