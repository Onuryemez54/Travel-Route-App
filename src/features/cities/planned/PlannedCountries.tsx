import { useAppSelector } from "../../../app/hooks";
import { getUniqueCountries } from "../../../utils/getUniqueCountries";
import { CountryItem } from "../components/CountryItem";
import { HeadingMessage } from "../components/HeadingMessage";

export const PlannedCountries = () => {
  const planned = useAppSelector((state) => state.cities.cities.planned);
  const uniqueCountries = getUniqueCountries(planned);
  return (
    <div className="w-full px-4 py-3 text-stone-300 ">
      <HeadingMessage
        placeType="countries"
        total={uniqueCountries}
        mode="planned"
      />
      <ul className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 2xl:grid-cols-3 ">
        {uniqueCountries.map((country) => (
          <CountryItem key={country.countryName} country={country} />
        ))}
      </ul>
    </div>
  );
};
