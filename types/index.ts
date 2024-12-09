export {};

declare global {
  // TypeScript type for weather condition mappings
  type WeatherCondition = {
    condition: string;
    icon: string;
  };
  interface Day {
    date: string; // The date for this forecast (e.g., "2024-12-09")
    maxTemp: number; // Maximum temperature of the day in degrees (Celsius or Fahrenheit)
    minTemp: number; // Minimum temperature of the day in degrees (Celsius or Fahrenheit)
    avgTemp?: number; // Average temperature of the day, optional
    condition: string; // A textual description of the weather condition (e.g., "Sunny", "Rainy")
    icon?: string; // URL or relative path to an icon representing the weather
    humidity: number; // Humidity percentage
    windSpeed: number; // Wind speed in appropriate units (e.g., km/h, mph)
    windDirection: string; // Direction of wind (e.g., "NW", "E")
    uvIndex?: number; // UV index for the day, optional
    precipitation: number; // Total precipitation in mm or inches
    sunrise?: string; // Time of sunrise (e.g., "06:45 AM"), optional
    sunset?: string; // Time of sunset (e.g., "05:30 PM"), optional
    snowChance?: number; // Chance of snow as a percentage, optional
    rainChance?: number; // Chance of rain as a percentage, optional
    feelsLikeMax?: number; // "Feels like" max temperature, optional
    feelsLikeMin?: number; // "Feels like" min temperature, optional
  }
}
