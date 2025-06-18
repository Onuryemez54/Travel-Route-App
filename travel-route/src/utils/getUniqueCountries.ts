import type { City } from "../features/cities/citiesTypes";

export interface Country {
  countryName: string;
  countryCode: string;
  position: {
    lat: number;
    lng: number;
  };
}

export const getUniqueCountries = (cities: City[]): Country[] => {
  return cities.reduce((acc: Country[], curCity: City) => {
    const alreadyIncluded = acc.some(
      (item) => item.countryName === curCity.countryName
    );

    if (!alreadyIncluded) {
      acc.push({
        countryName: curCity.countryName,
        countryCode: curCity.countryCode,
        position: {
          lat: parseFloat(curCity.position.lat),
          lng: parseFloat(curCity.position.lng),
        },
      });
    }

    return acc;
  }, []);
};
