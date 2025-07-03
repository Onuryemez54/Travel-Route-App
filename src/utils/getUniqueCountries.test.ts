import type { City } from "../features/cities/citiesTypes";
import { mockCities } from "../test/mocks/mockCities";
import { getUniqueCountries } from "./getUniqueCountries";

describe("getUniqueCountries", () => {
  it("should return unique countries", () => {
    const result = getUniqueCountries(mockCities as City[]);
    expect(result).toHaveLength(2);

    expect(result).toEqual([
      {
        countryName: "Turkey",
        countryCode: "TR",
        position: { lat: 41.0082, lng: 28.9784 },
      },
      {
        countryName: "France",
        countryCode: "FR",
        position: { lat: 48.8566, lng: 2.3522 },
      },
    ]);
  });

  it("should return empty array when input is empty", () => {
    const result = getUniqueCountries([]);
    expect(result).toEqual([]);
  });
});
