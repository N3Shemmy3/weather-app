// Array of weather conditions mapped to Meteocons icons
export const weatherToMeteocon: WeatherCondition[] = [
  { condition: "sunny", icon: "meteocons:clear-day-fill" },
  { condition: "clear", icon: "meteocons:clear-day-fill" },
  { condition: "partly cloudy", icon: "meteocons:partly-cloudy-day-fill" },
  { condition: "cloudy", icon: "meteocons:cloudy-fill" },
  { condition: "overcast", icon: "meteocons:overcast-fill" },
  { condition: "mist", icon: "meteocons:mist-fill" },
  { condition: "patchy rain possible", icon: "meteocons:drizzle-fill" },
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
