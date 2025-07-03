import { useEffect, useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../../../components/ui/Button";
import { BackButton } from "../../../components/ui/BackButton";
import { useUrlPosition } from "../../../utils/hooks/useUrlPosition";
import axios from "axios";
import { Message } from "../../../components/ui/Message";
import { Spinner } from "../../../components/ui/Spinner";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addCity } from "../citiesSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type FormValues = {
  cityName: string;
  date: Date;
  notes?: string;
  category: "visited" | "planned";
};

export const Form = () => {
  const openCageKey = import.meta.env.VITE_openCageKey;
  const [lat, lng] = useUrlPosition();
  const user = useAppSelector((state) => state.auth.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoadingGeoLocation, setIsLoadingGeoLocation] = useState(false);
  const [geolocationError, setGeolocationError] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      cityName: "",
      date: new Date(),
      notes: "",
      category: "visited",
    },
  });

  const cityName = watch("cityName");
  const category = watch("category");

  useEffect(() => {
    const fetchGeolocation = async () => {
      if (lat === null || lng === null) {
        setGeolocationError(
          "Invalid location information. Please click on a valid area on the map."
        );
        return;
      }

      setIsLoadingGeoLocation(true);
      setGeolocationError("");

      try {
        const res = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${openCageKey}`
        );

        const result = res.data.results[0].components;

        if (result) {
          const name =
            result.city || result.province || result.state || result.town || "";
          setValue("cityName", name);
          setCountryName(result.country || "");
          setCountryCode(result.country_code || "");

          if (!result.country_code) {
            setGeolocationError(
              "Country code not found for the selected location."
            );
          }
        }
      } catch (error) {
        console.error("Error fetching geolocation:", error);
        setGeolocationError("Failed to fetch geolocation data.");
      } finally {
        setIsLoadingGeoLocation(false);
      }
    };

    fetchGeolocation();
  }, [lat, lng, openCageKey, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!user?.id) {
      setGeolocationError("User not found.");
      return;
    }

    const newCity = {
      id: crypto.randomUUID(),
      cityName: data.cityName,
      countryName,
      countryCode,
      date: data.date,
      notes: data.notes,
      position: {
        lat: lat?.toString() || "",
        lng: lng?.toString() || "",
      },
      category: data.category,
    };

    try {
      await dispatch(
        addCity({
          userId: user?.id,
          newCity,
        })
      ).unwrap();

      toast.success("City added successfully!");

      navigate(`${data.category === "visited" ? "/app" : "/app/planned"}`, {
        replace: true,
      });
    } catch (error) {
      toast.error(error as string);
    }
  };

  if (isLoadingGeoLocation) return <Spinner />;
  if (!lat && !lng) return <Message message="Click on the map to add a city" />;
  if (geolocationError) return <Message message={geolocationError} />;

  return (
    <div className="px-4">
      <form
        data-testid="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2 px-6 py-5 mt-3 bg-gray-700 rounded-lg text-stone-300"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="cityName" className="font-medium text-md">
            City Name
          </label>
          <input
            type="text"
            id="cityName"
            {...register("cityName", { required: true })}
            placeholder="Enter city name"
            className="px-3 py-2 bg-gray-800 border-none rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          {errors.cityName && (
            <span className="text-sm text-orange-400/80">
              City name is required.
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            data-testid="date"
            htmlFor="date"
            className="font-medium text-md "
          >
            When did you go to {cityName || "the city"} or will go?
          </label>
          <Controller
            control={control}
            name="date"
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                id="date"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyyy"
                className="px-3 py-2 bg-gray-800 border-none rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                scrollableYearDropdown
                yearDropdownItemNumber={100}
              />
            )}
          />
          {errors.date && (
            <span className="text-sm text-orange-400/80">
              Date is required.
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="notes" className="text-sm font-medium ">
            Notes about your trip to {cityName || "the city"}
          </label>
          <textarea
            id="notes"
            rows={4}
            {...register("notes")}
            placeholder="Share your experience or notes..."
            className="px-3 py-2 bg-gray-800 border-none rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="my-1 text-sm font-medium">
            Did you go to the {cityName || "the city"} or are you planning to
            go?
          </span>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="visited"
                {...register("category")}
                checked={category === "visited"}
                className="w-4 h-4 transition-transform duration-200 accent-green-400 hover:scale-110"
              />
              <span className="text-sm font-bold">Visited</span>
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="planned"
                {...register("category")}
                checked={category === "planned"}
                className="w-4 h-4 transition-transform duration-200 accent-red-500 hover:scale-110"
              />
              <span className="text-sm font-bold">Planned</span>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-1 mt-2">
          <Button type="addCity">
            <span className="font-bold">+ Add City</span>
          </Button>
          <BackButton />
        </div>
      </form>
    </div>
  );
};
