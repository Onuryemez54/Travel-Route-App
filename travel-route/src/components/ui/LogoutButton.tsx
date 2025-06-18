import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { logoutUserThunk } from "../../app/authThunk";
import { resetCitiesState } from "../../features/cities/citiesSlice";
import toast from "react-hot-toast";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(logoutUserThunk());
    dispatch(resetCitiesState());
    toast.success("You have successfully logged out.");
    navigate("/login", { replace: true });
  };

  return (
    <button
      onClick={handleClick}
      className="px-1 sm:py-3  sm:mb-1  cursor-pointer font-semibold text-orange-600 hover:text-orange-700 hover:bg-stone-200 rounded-md transition-colors duration-400"
    >
      Logout
    </button>
  );
};
