import { useParams } from "react-router-dom";
import { useUrlPosition } from "../utils/hooks/useUrlPosition";
import { useEffect, useState } from "react";
import {
  fetchPlaceDetail,
  fetchPlacesData,
  fetchWikiInfo,
} from "../services/detailServicesApi";
import type {
  PlaceDetailType,
  PlacesType,
  WikipediaInfoType,
} from "../services/detailServicesTypes";
import { Spinner } from "../components/ui/Spinner";
import { AppNav } from "../components/ui/AppNav";
import { BackButton } from "../components/ui/BackButton";
import { Footer } from "../components/ui/Footer";
import { CityHeader } from "../components/cityDetailComponents/CityHeader";
import { CityDescription } from "../components/cityDetailComponents/CityDescription";
import { PlacesList } from "../components/cityDetailComponents/PlacesList";
import { PlaceDetail } from "../components/cityDetailComponents/PlaceDetail";
import { PageLoader } from "../components/ui/PageLoader";
import { useAppSelector } from "../app/hooks";
import { TodoListSection } from "../components/cityDetailComponents/TodoListSection";
import { ErrorMessage } from "../components/ui/ErrorMessage";

const CityTour = () => {
  const { cityName } = useParams();
  const [urlLat, urlLng] = useUrlPosition();
  const currentCity = useAppSelector((state) => state.cities.currentCity);

  const [isLoading, setIsLoading] = useState(false);
  const [detailIsLoading, setDetailIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wikiInfo, setWikiInfo] = useState<WikipediaInfoType>(
    {} as WikipediaInfoType
  );
  const [places, setPlaces] = useState<PlacesType[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetailType | null>(
    null
  );

  useEffect(() => {
    const loadData = async () => {
      if (!cityName) return;
      setIsLoading(true);
      setError(null);

      try {
        const wikiData = await fetchWikiInfo(cityName);

        const placesData = await fetchPlacesData(
          wikiData?.coordinates.lat || urlLat,
          wikiData?.coordinates.lon || urlLng
        );
        if (wikiData) {
          setWikiInfo(wikiData);
          if (placesData && placesData.length > 0) setPlaces(placesData);
        } else {
          throw new Error("No data found for the given city name");
        }
      } catch (err) {
        const error = err as Error;
        setIsLoading(false);
        setError(error.message || "An error occurred while fetching data");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [cityName, urlLat, urlLng]);

  const handleSelectPlace = async (xid: string) => {
    setDetailIsLoading(true);
    setSelectedPlace(null);
    setError(null);

    try {
      const detail = await fetchPlaceDetail(xid);
      setSelectedPlace(detail);
    } catch (err) {
      const error = err as Error;
      setDetailIsLoading(false);
      setError(error.message || "An error occurred while fetching data");
    } finally {
      setDetailIsLoading(false);
    }
  };

  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="w-full h-screen scroll">
      <AppNav mode="detail" />
      {isLoading && <PageLoader />}
      <CityHeader thumbnail={wikiInfo.thumbnail} title={wikiInfo.title} />
      <CityDescription
        title={wikiInfo.title}
        description={wikiInfo.description}
        extract={wikiInfo.extract}
      />
      <div className="flex flex-col  sm:flex-row px-4 py-2 justify-center items-start gap-4 mb-10">
        <PlacesList
          places={places}
          selectedPlaceName={selectedPlace?.name || ""}
          onSelect={handleSelectPlace}
        />
        <div className="flex-1 max-w-7xl">
          {detailIsLoading && <Spinner />}
          {selectedPlace && <PlaceDetail place={selectedPlace} />}
        </div>
      </div>
      <div className="fixed bottom-2 right-6 z-50 text-white">
        <BackButton />
      </div>
      {currentCity?.category === "planned" && <TodoListSection />}
      <Footer />
    </div>
  );
};
export default CityTour;
