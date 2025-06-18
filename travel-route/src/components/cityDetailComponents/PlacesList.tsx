import type { PlacesType } from "../../services/detailServicesTypes";

interface Props {
  places: PlacesType[];
  selectedPlaceName: string | null;
  onSelect: (xid: string) => void;
}

export const PlacesList = ({ places, selectedPlaceName, onSelect }: Props) => {
  const uniquePlaces = places.reduce((acc: PlacesType[], place: PlacesType) => {
    if (!acc.some((p) => p.name === place.name)) {
      acc.push(place);
    }
    return acc;
  }, []);

  const sortedPlacesList = uniquePlaces.sort(
    (a, b) => Number(b.rate) - Number(a.rate)
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-2 ">
      {sortedPlacesList.length > 0 && (
        <>
          <h3 className="text-lg font-bold text-green-700 capitalize 2xl:text-xl">
            Interesting places
          </h3>

          <ul className="grid grid-cols-2 gap-2 w-full sm:w-40 md:w-50 2xl:w-60 sm:block max-h-[100vh] scroll divide-y divide-green-400 rounded-2xl shadow-2xl">
            {sortedPlacesList.map((place) => (
              <li
                key={place.xid}
                className={`px-4 py-3 sm:px-6 sm:py-4 cursor-pointer text-gray-800 hover:text-gray-100 hover:bg-green-400/90 transition-colors duration-300 rounded-2xl ${
                  selectedPlaceName === place.name
                    ? "bg-green-400 text-white"
                    : ""
                }`}
                onClick={() => onSelect(place.xid)}
              >
                <h3 className="text-sm sm:text-[16px] lg:text-lg font-semibold">
                  {place.name}
                </h3>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

// className="w-40  sm:w-60 max-h-[100vh] scroll divide-y divide-green-400 rounded-2xl shadow-2xl "
