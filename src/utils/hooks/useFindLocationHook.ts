import { useState } from "react";

export interface PositionType {
  lat: number;
  lng: number;
}

export const useFindLocationHook = () => {
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [locationPosition, setLocationPosition] = useState<PositionType | null>(
    null
  );
  const [locationError, setLocationError] = useState<string | null>(null);

  const getPosition = () => {
    if (!navigator.geolocation)
      return setLocationError("Your browser does not support geolocation");

    setIsLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLocationLoading(false);
      },
      (error) => {
        setLocationError(error.message);
        setIsLocationLoading(false);
      }
    );
  };

  return { isLocationLoading, locationPosition, locationError, getPosition };
};
