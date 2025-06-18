import { useSearchParams } from "react-router-dom";

export const useUrlPosition = (): [number | null, number | null] => {
  const [searchParams] = useSearchParams();
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));

  const safeLat = isNaN(lat) ? null : lat;
  const safeLng = isNaN(lng) ? null : lng;

  return [safeLat, safeLng];
};
