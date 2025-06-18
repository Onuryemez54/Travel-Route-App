import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaSearchLocation } from "react-icons/fa";
import { useKey } from "../../utils/hooks/useKey";

export const SearchCity = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const callBackAction = () => {
    if (document.activeElement === inputRef.current) return;
    inputRef?.current?.focus();
  };
  useKey("Enter", callBackAction);

  const openCageKey = import.meta.env.VITE_openCageKey;
  const [cityName, setCityName] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityName) return;

    try {
      const res = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          cityName
        )}&key=${openCageKey}`
      );
      if (res.data.results.length === 0) {
        throw new Error("No results found for the given city name.");
      }

      const { lat, lng } = res.data.results[0].geometry;

      if (!lat || !lng) {
        throw new Error("Geocoding failed to return valid coordinates.");
      }
      navigate(`form?lat=${lat}&lng=${lng}`);
      setCityName("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to search city."
      );
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-center gap-2 p-2 text-green-400 rounded-full "
    >
      <input
        type="text"
        ref={inputRef}
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        placeholder="Search city..."
        className="w-40 px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full text-stone-200 bg-gray-800/80 placeholder:text-stone-400 focus:w-45 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent sm:w-56 sm:focus:w-66 "
      />
      <span className="hidden sm:block ">
        <FaSearchLocation size={20} />
      </span>
    </form>
  );
};
