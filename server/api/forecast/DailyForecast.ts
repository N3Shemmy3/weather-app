import { weatherApiBaseUrl, weatherEndPoints } from "~/classes/WeatherApi";
import { getQuery } from "h3";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  // Function to fetch weather forecast data by city name
  const fetchForecastByCity = async (city: string, days = 7): Promise<any> => {
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
      if (err instanceof Error) {
        return { error: err.message };
      }
      return { error: "An unknown error occurred." };
    }
  };

  // Function to fetch current weather data by coordinates
  const fetchWeatherByCoords = async (
    lat: number,
    lon: number
  ): Promise<any> => {
    const url = `${weatherApiBaseUrl}${weatherEndPoints.current}?key=${runtimeConfig.public.weatherapikey}&q=${lat},${lon}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }
      return await response.json();
    } catch (err) {
      if (err instanceof Error) {
        return { error: err.message };
      }
      return { error: "An unknown error occurred." };
    }
  };

  // Extract query parameters using getQuery
  const { city, lat, lon, days } = getQuery(event);

  // Determine which function to call based on the parameters
  if (city) {
    // Fetch forecast data by city
    return await fetchForecastByCity(city as string, days ? Number(days) : 7);
  } else if (lat && lon) {
    // Fetch weather data by coordinates
    return await fetchWeatherByCoords(Number(lat), Number(lon));
  } else {
    // Return an error if required parameters are missing
    return {
      error: "Either 'city' or 'lat' and 'lon' parameters are required.",
    };
  }
});
