import type { City } from "../../features/cities/citiesTypes";

export const mockCities: City[] = [
  {
    id: "1",
    cityName: "İstanbul",
    countryName: "Turkey",
    countryCode: "TR",
    date: new Date("2024-06-02"),
    position: {
      lat: "41.0082",
      lng: "28.9784",
    },
    category: "visited",
  },
  {
    id: "2",
    cityName: "Ankara",
    countryName: "Turkey",
    countryCode: "TR",
    date: new Date("2025-08-02"),
    position: {
      lat: "39.9208",
      lng: "32.8541",
    },
    category: "visited",
  },
  {
    id: "3",
    cityName: "Paris",
    countryName: "France",
    countryCode: "FR",
    date: new Date("2026-07-14"),
    position: {
      lat: "48.8566",
      lng: "2.3522",
    },
    category: "visited",
  },
];
export const mockCityPlanned: City = {
  id: "3",
  cityName: "Paris",
  countryName: "France",
  countryCode: "FR",
  date: new Date("2026-07-14"),
  position: {
    lat: "48.8566",
    lng: "2.3522",
  },
  category: "planned",
  todoList: [
    {
      id: "todo1",
      text: "Visit the Eiffel Tower",
      completed: true,
    },
    {
      id: "todo2",
      text: "Explore the Louvre Museum",
      completed: false,
    },
  ],
};
export const mockCityVisited: City = {
  id: "4",
  cityName: "Eskişehir",
  countryName: "Turkey",
  countryCode: "TR",
  date: new Date("2022-07-14"),
  position: {
    lat: "39.7767",
    lng: "30.5206",
  },
  category: "visited",
};
