import { weatherApiBaseUrl, weatherEndPoints } from "~/classes/WeatherApi";
import { getQuery } from "h3";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  // Function to fetch weather forecast data
  const fetchForecast = async (city: string, days = 7): Promise<any> => {
    const url = `${weatherApiBaseUrl}${weatherEndPoints.forecast}?key=${runtimeConfig.public.weatherapikey}&q=${city}&days=${days}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (err) {
      // Narrow or assert the type of `err`
      if (err instanceof Error) {
        return { error: err.message };
      }

      // Fallback for unexpected error types
      return { error: "An unknown error occurred." };
    }
  };

  // Extract query parameters using getQuery
  const { city, days } = getQuery(event);

  // Ensure required parameters are provided
  if (!city) {
    return { error: "City parameter is required" };
  }

  // Fetch forecast data
  const forecast = await fetchForecast(city as string, days ? Number(days) : 7);
  return forecast;
});
