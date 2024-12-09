import { weatherApiBaseUrl, weatherEndPoints } from "~/classes/WeatherApi";
import { getQuery } from "h3";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  // Utility to fetch weather data
  const fetchWeatherData = async (city: string, days = 7): Promise<any> => {
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

  // Extract query parameters
  const { city, days } = getQuery(event);

  if (!city) {
    return { error: "City parameter is required" };
  }

  // Fetch weather data
  const weatherData = await fetchWeatherData(
    city as string,
    days ? Number(days) : 7
  );

  // If only 1-day data is fetched, include hourly information
  if (days === "1" && weatherData.forecast?.forecastday.length > 0) {
    const hourlyData = weatherData.forecast.forecastday[0].hour;
    const currentHour = new Date().getHours();
    weatherData.hourly = hourlyData.filter(
      (hour: { time: string | number | Date }) => {
        const hourTime = new Date(hour.time).getHours();
        return hourTime >= currentHour;
      }
    );
  }

  return weatherData;
});
