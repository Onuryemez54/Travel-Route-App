import { FaWikipediaW } from "react-icons/fa";
import type { PlaceDetailType } from "../../services/detailServicesTypes";

export const PlaceDetail = ({ place }: { place: PlaceDetailType }) => {
  return (
    <div
      data-testid="placeDetail"
      className="max-w-full mx-auto p-4 slide-in-right rounded-2xl shadow-2xl"
    >
      <h2 className="text-xl font-bold mb-3 text-center">{place.name}</h2>
      {place.preview?.source && (
        <img
          src={place.preview.source}
          alt={place.name}
          className="w-full h-64 sm:h-100 2xl:h-120 object-cover rounded-2xl mb-4"
        />
      )}
      <p data-testid="extract" className="text-gray-700">
        {place.wikipedia_extracts?.text || "No description"}
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mt-10">
        <a
          href={`https://www.google.com/maps?q=${place.point.lat},${place.point.lon}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 max-w-xs hover:text-gray-100 hover:bg-blue-400 rounded-xl border-1 px-2 py-1 sm:px-4 sm:py-1 font-semibold"
        >
          Open in Google Maps
        </a>
        <a
          href={`https://en.wikipedia.org/wiki/${encodeURIComponent(
            place.name || ""
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:text-blue-400 hover:underline  font-semibold"
        >
          <p className="flex gap-0.5 items-center">
            <FaWikipediaW />
            <span>Click for more information about {place.name}</span>
          </p>{" "}
        </a>
      </div>
    </div>
  );
};
