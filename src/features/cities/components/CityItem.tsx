import { Link } from "react-router-dom";
import type { City } from "../citiesTypes";
import { countryCodeToFlagSrc, formatDate } from "../../../utils/helpers";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteCity } from "../citiesSlice";

export const CityItem = ({ city }: { city: City }) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const currentCity = useAppSelector((state) => state.cities.currentCity);
  const userId = currentUser?.id || "";

  const dispatch = useAppDispatch();
  const { cityName, countryCode, date, id, position } = city;
  const { lat, lng } = position;

  return (
    <li>
      <Link
        to={`/app/cities/${id}?lat=${lat}&lng=${lng}`}
        className={`flex flex-wrap items-center justify-between gap-2 p-3 transition-colors duration-300 bg-gray-700 shadow-2xl hover:bg-green-400/80 hover:text-gray-800 rounded-xl md:flex-nowrap ${
          currentCity?.id === id ? "border-2 border-green-400" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <img
            src={countryCodeToFlagSrc(countryCode)}
            alt={countryCode}
            className="object-cover h-5 rounded shadow-lg w-7"
          />
          <h3 className="text-base font-semibold">{cityName}</h3>
        </div>

        <div className="flex items-center gap-2">
          <time className="text-sm font-semibold ">{formatDate(date)}</time>

          <button
            className="h-8 text-lg font-normal transition-all duration-200 bg-gray-800 rounded-full cursor-pointer aspect-square text-stone-200 hover:bg-amber-400 hover:text-gray-900"
            title="Remove city"
            onClick={(e) => {
              e.preventDefault();
              dispatch(deleteCity({ userId, cityId: id }));
            }}
          >
            &times;
          </button>
        </div>
      </Link>
    </li>
  );
};
