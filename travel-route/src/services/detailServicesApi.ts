import axios from "axios";
import type { WikipediaInfoType } from "./detailServicesTypes";
import type { PlaceDetailType } from "./detailServicesTypes";

export const fetchWikiInfo = async (
  placeName: string
): Promise<WikipediaInfoType | void | null> => {
  if (!placeName) {
    throw new Error("Place name is required");
  }
  try {
    const res = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        placeName
      )}`
    );
    const data = res.data;
    if (!data || !data.title)
      throw new Error("No data found for the given place name");

    return {
      coordinates: {
        lat: data.coordinates?.lat,
        lon: data.coordinates?.lon,
      },
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail
        ? data.originalimage.source || data.thumbnail.source
        : null,
      extract: data.extract,
    };
  } catch (err) {
    console.error("Error fetching Wikipedia info:", err);
    return null;
  }
};

const apiKey = import.meta.env.VITE_openTripMapKey;

export const fetchPlacesData = async (
  lat: number | null,
  lon: number | null,
  radius = 10000
) => {
  const url = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&limit=30&rate=2&format=json&apikey=${apiKey}`;
  const res = await axios.get(url);
  return res.data;
};

export const fetchPlaceDetail = async (
  xid: string
): Promise<PlaceDetailType> => {
  const url = `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${apiKey}`;
  const res = await axios.get(url);
  return res.data;
};
