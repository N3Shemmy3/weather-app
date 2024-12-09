import { weatherApiBaseUrl, weatherEndPoints } from "~/classes/WeatherApi";
import { getQuery } from "h3";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  // Extract query parameters
  const { city, lat, lon, days } = getQuery(event);

  // Utility to fetch weather forecast by city name
  const fetchForecastByCity = async (
    city: string,
    days: number = 7
  ): Promise<any> => {
    const url = `${weatherApiBaseUrl}${weatherEndPoints.forecast}?key=${runtimeConfig.public.weatherapikey}&q=${city}&days=${days}&hourly=1`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
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
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
    }
    return response.json();
  };

  try {
    if (city) {
      // Fetch forecast data by city (including hourly forecast)
      const forecastData = await fetchForecastByCity(
        city as string,
        Number(days) || 7
      );

      // Extract hourly forecast if available
      const hourlyForecast = forecastData?.forecast?.forecastday?.map(
        (day: any) => {
          return day.hour; // Return the hourly data for each day
        }
      );

      // Combine hourly data with the rest of the forecast data
      return { ...forecastData, hourlyForecast };
    } else if (lat && lon) {
      // Fetch weather data by coordinates (current weather, not hourly)
      return await fetchWeatherByCoords(Number(lat), Number(lon));
    } else {
      throw new Error(
        "Either 'city' or 'lat' and 'lon' parameters are required."
      );
    }
  } catch (error) {
    // Return error message
    return { error: error.message || "An unknown error occurred." };
  }
});
