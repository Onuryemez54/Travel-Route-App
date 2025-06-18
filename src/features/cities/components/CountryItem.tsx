import { Link } from "react-router-dom";
import type { Country } from "../../../utils/getUniqueCountries";
import { countryCodeToFlagSrc } from "../../../utils/helpers";

export const CountryItem = ({ country }: { country: Country }) => {
  const { lat, lng } = country.position;
  return (
    <li>
      <Link
        to={`?lat=${lat}&lng=${lng}`}
        className="flex items-center justify-between gap-2 p-3 transition-colors duration-300 bg-gray-700 shadow hover:bg-green-400 hover:text-gray-800 rounded-xl"
      >
        <img
          src={countryCodeToFlagSrc(country.countryCode)}
          alt={`${country.countryName} flag`}
          className="w-10 h-8 rounded-lg"
        />
        <span className="font-medium text-md">{country.countryName}</span>
      </Link>
    </li>
  );
};
