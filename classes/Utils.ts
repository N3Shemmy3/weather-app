import { parse, format } from "date-fns";

// Array of weather conditions mapped to Meteocons icons
export const weatherToMeteocon: WeatherCondition[] = [
  { condition: "sunny", icon: "meteocons:clear-day-fill" },
  { condition: "clear", icon: "meteocons:clear-day-fill" },
  { condition: "partly cloudy", icon: "meteocons:partly-cloudy-day-fill" },
  { condition: "cloudy", icon: "meteocons:cloudy-fill" },
  { condition: "overcast", icon: "meteocons:overcast-fill" },
  { condition: "mist", icon: "meteocons:mist-fill" },
  { condition: "patchy rain possible", icon: "meteocons:drizzle-fill" },
  { condition: "patchy rain nearby", icon: "meteocons:drizzle-fill" }, // Ensure this is included
  { condition: "light rain", icon: "meteocons:rain-fill" },
  { condition: "heavy rain", icon: "meteocons:extreme-rain-fill" },
  { condition: "thunderstorm", icon: "meteocons:thunderstorms-fill" },
  { condition: "snow", icon: "meteocons:snow-fill" },
  { condition: "hail", icon: "meteocons:extreme-hail-fill" },
  { condition: "fog", icon: "meteocons:fog-fill" },
  { condition: "windy", icon: "meteocons:wind-fill" },
  { condition: "blizzard", icon: "meteocons:snowflake-fill" },
  { condition: "dust", icon: "meteocons:dust-fill" },
  { condition: "sand", icon: "meteocons:dust" },
  { condition: "hot", icon: "meteocons:clear-day-fill" },
  { condition: "isolated thunderstorms", icon: "meteocons:thunderstorms-fill" },
];

// Convert weatherToMeteocon array to a Map for faster lookups
const weatherToMeteoconMap = new Map(
  weatherToMeteocon.map((item) => [item.condition, item.icon])
);

// Function to get the appropriate Meteocons icon
export const getMeteoconIcon = (
  weatherCondition: string,
  isDay: number
): string => {
  if (typeof weatherCondition !== "string") return "meteocons:code-green"; // Default icon

  const trimmedCondition = weatherCondition.trim().toLowerCase();
  const nightMode = isDay === 0;

  // Handle special cases for night/day differentiation
  if (trimmedCondition === "clear") {
    return nightMode
      ? "meteocons:clear-night-fill"
      : "meteocons:clear-day-fill";
  }

  if (trimmedCondition === "partly cloudy") {
    return nightMode
      ? "meteocons:partly-cloudy-night-fill"
      : "meteocons:partly-cloudy-day-fill";
  }

  // Return the matched icon or a default if not found
  return weatherToMeteoconMap.get(trimmedCondition) || "meteocons:code-green";
};

export const formatDate = (localTime: string): string => {
  try {
    // Parse the local time string into a Date object
    const parsedDate = parse(localTime, "yyyy-MM-dd HH:mm", new Date());

    // Return the formatted date as '9 December'
    return format(parsedDate, "d MMMM");
  } catch (error) {
    console.error("Error formatting date:", error);
    return ""; // Return empty string in case of error
  }
};

export const formatHour = (time: any) => {
  if (!time) return "";
  const parsedTime = parse(time, "yyyy-MM-dd HH:mm", new Date());
  return format(parsedTime, "h a"); // Formats time to "2 PM"
};

export const formatWeatherSpecifics = (weather: any) => {
  const detailsMap = [
    {
      name: "Temperature",
      value: weather.current?.temp_c
        ? `${weather.current.temp_c}°C`
        : undefined,
      icon: "meteocons:thermometer-mercury",
    },
    {
      name: "Humidity",
      value:
        weather.current?.humidity !== undefined
          ? `${weather.current.humidity}%`
          : undefined,
      icon: "meteocons:humidity-fill",
    },
    {
      name: "Wind Speed",
      value: weather.current?.wind_kph
        ? `${weather.current.wind_kph} kph`
        : undefined,
      icon: "meteocons:wind-fill",
    },
    {
      name: "UV Index",
      value: weather.current?.uv !== undefined ? weather.current.uv : undefined,
      icon: "meteocons:uv-index",
    },
  ];

  // Filter out any details with undefined values and return the valid details
  return detailsMap.filter((item) => item.value !== undefined);
};
export const getGeolocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(new Error("Failed to get location: " + error.message));
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};
