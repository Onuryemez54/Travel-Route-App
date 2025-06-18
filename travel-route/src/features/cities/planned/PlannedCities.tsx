import { useAppSelector } from "../../../app/hooks";
import { Message } from "../../../components/ui/Message";
import { Spinner } from "../../../components/ui/Spinner";
import { CityItem } from "../components/CityItem";
import { HeadingMessage } from "../components/HeadingMessage";

export const PlannedCities = () => {
  const {
    cities: { planned },
    isLoading,
    error,
  } = useAppSelector((state) => state.cities);
  const sortedList = planned
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (isLoading) return <Spinner />;

  if (error) return <Message message={error} />;

  return (
    <div className="w-full px-4 py-3 text-stone-300 ">
      <HeadingMessage placeType="cities" total={planned} mode="planned" />
      <ul className="flex flex-col w-full gap-2 mt-2">
        {sortedList.map((city) => (
          <CityItem key={city.id} city={city} />
        ))}
      </ul>
    </div>
  );
};
