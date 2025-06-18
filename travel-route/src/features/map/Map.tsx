import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import { greenIcon, redIcon } from "../../utils/mapMarkerIcons";
import { countryCodeToFlagSrc, formatDate } from "../../utils/helpers";
import { useAppSelector } from "../../app/hooks";
import { useUrlPosition } from "../../utils/hooks/useUrlPosition";
import { useFindLocationHook } from "../../utils/hooks/useFindLocationHook";
import { Button } from "../../components/ui/Button";

export type LatLngArray = [number, number];

export interface ChangeMapCenterProps {
  position: LatLngArray;
}

export const Map = () => {
  const { planned, visited } = useAppSelector((state) => state.cities.cities);
  const cities = [...planned, ...visited];

  const [mapPosition, setMapPosition] = useState<LatLngArray>([40, 30]);
  const [urlLat, urlLng] = useUrlPosition();
  const { isLocationLoading, locationPosition, getPosition } =
    useFindLocationHook();
  const { lat: locationLat, lng: locationLng } = locationPosition || {};

  useEffect(() => {
    if (urlLat && urlLng) setMapPosition([+urlLat, +urlLng]);
  }, [urlLat, urlLng]);

  useEffect(() => {
    if (locationLat && locationLng) {
      setMapPosition([locationLat, locationLng]);
    }
  }, [locationLat, locationLng]);

  return (
    <div className="absolute top-0 left-0 z-10 w-full h-full">
      <div className="relative w-full h-full">
        {!locationPosition && (
          <Button click={() => getPosition()} type="location">
            {isLocationLoading ? "Finding..." : "My Location"}
          </Button>
        )}
        <MapContainer
          center={mapPosition}
          zoom={7}
          className="w-full h-full"
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />
          {cities.map((city) => (
            <Marker
              key={city.id}
              position={[+city.position.lat, +city.position.lng]}
              icon={city.category === "planned" ? redIcon : greenIcon}
            >
              <Popup>
                <div className="flex flex-col items-center text-center ">
                  <img
                    src={countryCodeToFlagSrc(city.countryCode)}
                    alt=""
                    className="h-4 mb-1"
                  />
                  <span className="font-semibold">{city.cityName}</span>
                  <span className="text-xs text-gray-500">
                    {city.countryName}
                  </span>
                  <span className="text-xs">{formatDate(city.date)}</span>
                </div>
              </Popup>
            </Marker>
          ))}

          <ChangeMapCenter position={mapPosition} />
          <DetectClick />
          <ZoomControl position="bottomright" />
        </MapContainer>
      </div>
    </div>
  );
};

const ChangeMapCenter = ({ position }: ChangeMapCenterProps): null => {
  const map = useMap();
  map.setView(position);
  return null;
};

const DetectClick = (): null => {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
};
