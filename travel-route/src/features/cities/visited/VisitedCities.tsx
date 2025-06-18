import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { Spinner } from "../../../components/ui/Spinner";
import { CityItem } from "../components/CityItem";
import { HeadingMessage } from "../components/HeadingMessage";
import { Message } from "../../../components/ui/Message";

export const VisitedCities = () => {
  const {
    cities: { visited },
    isLoading,
    error,
  } = useAppSelector((state) => state.cities);

  const sortedList = visited
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const favoritedSortedList = sortedList.filter((city) => city.isFavorite);

  const [activeTab, setActiveTab] = useState<"all" | "favorite">("all");

  const displayedList = activeTab === "all" ? sortedList : favoritedSortedList;

  if (isLoading) return <Spinner />;

  if (error) return <Message message={error} />;

  return (
    <div className="w-full px-4 py-3 space-y-3 text-stone-300">
      <HeadingMessage placeType="cities" total={visited} mode="visited" />

      {visited.length > 0 && (
        <div className="flex items-center justify-between gap-2 px-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`transition-all duration-300 cursor-pointer text-sm sm:text-lg font-semibold
            ${
              activeTab === "all"
                ? "border-b-2  border-green-500 text-green-500"
                : "text-stone-200 hover:text-green-400"
            }`}
          >
            All visited cities
          </button>
          <button
            onClick={() => setActiveTab("favorite")}
            className={`transition-colors duration-300 cursor-pointer text-sm sm:text-lg font-semibold
            ${
              activeTab === "favorite"
                ? "border-b-2  border-red-500 text-red-500"
                : "text-stone-200 hover:text-red-400"
            }`}
          >
            Favorite cities
          </button>
        </div>
      )}

      <ul className="flex flex-col w-full gap-2 mt-2">
        {displayedList.map((city) => (
          <CityItem key={city.id} city={city} />
        ))}
      </ul>
    </div>
  );
};
