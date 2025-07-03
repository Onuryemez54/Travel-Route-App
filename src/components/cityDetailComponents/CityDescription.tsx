import { FaWikipediaW } from "react-icons/fa";

export const CityDescription = ({
  title,
  description,
  extract,
}: {
  title: string;
  description: string;
  extract: string;
}) => {
  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-7xl rounded-2xl shadow-2xl p-8">
        <h1
          data-testid="title"
          className="text-3xl font-bold text-center text-gray-800 mb-6"
        >
          {title}
        </h1>
        <p className="text-gray-700 text-center mb-4 font-medium">
          {description}
        </p>
        <p
          data-testid="city-extract"
          className="text-gray-800 text-justify leading-relaxed font-medium"
        >
          {extract}
        </p>
        <div className="mt-6">
          <a
            href={`https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-blue-400 hover:underline font-semibold"
          >
            <p className="flex gap-0.5 items-center justify-end">
              <FaWikipediaW />
              <span>Click for more information about {title}</span>
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};
