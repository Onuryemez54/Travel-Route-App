import type { Country } from "../../../utils/getUniqueCountries";
import type { City } from "../citiesTypes";

export const HeadingMessage = ({
  total,
  mode,
  placeType,
}: {
  total: City[] | Country[];
  mode: "planned" | "visited";
  placeType: "cities" | "countries";
}) => {
  return (
    <p className="text-sm font-semibold text-center">
      {total.length === 0 ? (
        <span className="text-red-400">
          You have not {mode} any {placeType} yet.
        </span>
      ) : (
        <span>
          You have {mode} <strong>{total.length}</strong> {placeType} so far
        </span>
      )}
    </p>
  );
};
