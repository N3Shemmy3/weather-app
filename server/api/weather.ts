import { weatherApiBaseUrl, weatherEndPoints } from "~/classes/WeatherApi";
import { getQuery } from "h3";
import axios from "axios";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const location = query.location || "Lusaka"; // Default to 'London' if no location is provided
  const apikey = runtimeConfig.public.weatherapikey;
  const baseUrl = weatherApiBaseUrl;

  try {
    const response = await axios.get(`${baseUrl}${weatherEndPoints.forecast}`, {
      params: {
        key: apikey,
        q: location,
        days: 7, // Number of days to fetch the forecast for
      },
    });

    // Return the forecast data
    return response.data;
  } catch (error) {
    console.error("Error fetching weather forecast:", error);
    throw createError({
      statusCode: error.response?.status || 500,
      message: "Failed to fetch weather forecast",
    });
  }
});
