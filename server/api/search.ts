import { weatherApiBaseUrl, weatherEndPoints } from "~/classes/WeatherApi";
import { getQuery } from "h3";

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { query: searchQuery } = getQuery(event);

  if (!searchQuery || typeof searchQuery !== "string" || !searchQuery.trim()) {
    return { cities: [] }; // Return an empty list if the query is empty
  }

  try {
    const url = new URL(weatherApiBaseUrl + weatherEndPoints.search);
    url.searchParams.append("key", runtimeConfig.public.weatherapikey);
    url.searchParams.append("q", searchQuery);

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return { cities: data };
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return { error: "Failed to fetch city suggestions." };
  }
});
