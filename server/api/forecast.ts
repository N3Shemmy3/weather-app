import { weatherApiBaseUrl, weatherEndPoints } from "~/classes/WeatherApi"; // Adjust imports if necessary
import { getQuery } from "h3";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  // Extract query parameters from the request (city, lat, lon)
  const { city, lat, lon } = getQuery(event);

  // Utility to fetch the 7-day weather forecast by city name
  const fetchForecastByCity = async (city: string): Promise<any> => {
    const url = `${weatherApiBaseUrl}${weatherEndPoints.forecast}?key=${runtimeConfig.public.weatherapikey}&q=${city}&days=7`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
    }
    return response.json();
  };

  // Utility to fetch the 7-day weather forecast by coordinates (latitude and longitude)
  const fetchForecastByCoords = async (
    lat: number,
    lon: number
  ): Promise<any> => {
    const url = `${weatherApiBaseUrl}${weatherEndPoints.forecast}?key=${runtimeConfig.public.weatherapikey}&q=${lat},${lon}&days=7`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
    }
    return response.json();
  };

  try {
    if (city) {
      // Fetch 7-day forecast data by city name
      const forecastData = await fetchForecastByCity(city as string);
      return forecastData;
    } else if (lat && lon) {
      // Fetch 7-day forecast data by coordinates
      return await fetchForecastByCoords(Number(lat), Number(lon));
    } else {
      throw new Error(
        "Either 'city' or 'lat' and 'lon' parameters are required."
      );
    }
  } catch (error) {
    // Return error message if something goes wrong
    return { error: error.message || "An unknown error occurred." };
  }
});
