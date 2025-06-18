import { useAppSelector } from "../../../app/hooks";
import { getUniqueCountries } from "../../../utils/getUniqueCountries";
import { CountryItem } from "../components/CountryItem";
import { HeadingMessage } from "../components/HeadingMessage";

export const VisitedCountries = () => {
  const visited = useAppSelector((state) => state.cities.cities.visited);
  const uniqueCountries = getUniqueCountries(visited);
  return (
    <div className="w-full px-4 py-3 text-stone-300 ">
      <HeadingMessage
        placeType="countries"
        total={uniqueCountries}
        mode="visited"
      />
      <ul className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 2xl:grid-cols-3">
        {uniqueCountries.map((country) => (
          <CountryItem key={country.countryName} country={country} />
        ))}
      </ul>
    </div>
  );
};
