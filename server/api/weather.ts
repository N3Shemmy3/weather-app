import { weatherApiBaseUrl, weatherEndPoints } from "~/classes/WeatherApi";
import { getQuery } from "h3";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { city, lat, lon, days } = getQuery(event);

  // Utility to fetch weather forecast by city name
  const fetchForecastByCity = async (
    city: string,
    days: number = 7
  ): Promise<any> => {
    const url = `${weatherApiBaseUrl}${weatherEndPoints.forecast}?key=${runtimeConfig.public.weatherapikey}&q=${city}&days=${days}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  };

  // Utility to fetch weather by coordinates
  const fetchWeatherByCoords = async (
    lat: number,
    lon: number
  ): Promise<any> => {
    const url = `${weatherApiBaseUrl}${weatherEndPoints.current}?key=${runtimeConfig.public.weatherapikey}&q=${lat},${lon}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  };

  try {
    if (city) {
      return await fetchForecastByCity(city as string, Number(days) || 7);
    } else if (lat && lon) {
      return await fetchWeatherByCoords(Number(lat), Number(lon));
    } else {
      throw new Error(
        "Either 'city' or 'lat' and 'lon' parameters are required."
      );
    }
  } catch (error) {
    return { error: error.message || "An unknown error occurred." };
  }
});
