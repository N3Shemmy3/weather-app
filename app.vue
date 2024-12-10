<script setup>
import { formatWeatherSpecifics } from "./classes/Utils";

useSeoMeta({
  title: "N3Shemmy3-Weather",
  ogTitle: "N3Shemmy3-Weather",
  description: "NuxtJS weather app",
  ogDescription: "NuxtJS weather app.",
});

const searchQuery = ref(""); // User input
const forecast = ref({}); // Forecast data
const error = ref();
const dailyForecastData = ref();
const hourlyForecastData = ref();
const citySuggestions = ref([]); // City suggestions
const isLoading = ref(false); // Loading state
const showSearchDialog = ref(false);
const isSearching = ref(false);
let debounceTimer = null; // To store the timer ID
// Fetch city suggestions
const fetchCitySuggestions = async () => {
  if (!searchQuery.value.trim()) {
    citySuggestions.value = [];
    return;
  }
  isSearching.value = true;

  // Clear the previous debounce timer if it exists
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  // Set a new debounce timer
  debounceTimer = setTimeout(async () => {
    try {
      const response = await fetch(`/api/search?query=${searchQuery.value}`);
      const data = await response.json();
      citySuggestions.value = data.cities || [];
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
    isSearching.value = false;
  }, 300); // Delay in ms (300ms)
};

// Fetch weather forecast
const fetchCityWeather = async (city, days = 7) => {
  // Default to 7 days
  if (!city) return;

  isLoading.value = true;
  try {
    const response = await fetch(`/api/forecast?city=${city}`);
    const data = await response.json();

    if (response.ok) {
      forecast.value = data; // Assign the parsed data
    } else {
      throw new Error(data.message || "Failed to fetch weather data");
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};
const fetchCityWeatherGps = async (lat, lon, days = 7) => {
  isLoading.value = true;
  try {
    const response = await fetch(
      `/api/forecast?lat=${lat}&lon=${lon}&days=${days}`
    );
    const data = await response.json();

    if (response.ok) {
      forecast.value = data; // Assign the parsed data
    } else {
      throw new Error(data.message || "Failed to fetch weather data");
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

const fetchGps = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchCityWeatherGps(latitude, longitude, 7);
        console.log(latitude, longitude);
      },
      (error) => {
        console.log(Error("Failed to get location: " + error.message));
      }
    );
  } else {
    console.log(Error("Geolocation is not supported by this browser."));
  }
};
onMounted(() => {
  fetchGps();
});
</script>

<template>
  <App>
    <!-- main app search dialog -->
    <SearchDialog
      :showDialog="showSearchDialog"
      @onOverlayClicked="showSearchDialog = !showSearchDialog"
      @onQueryChanged="
        (query) => {
          searchQuery = query;
          fetchCitySuggestions();
        }
      "
      :isSearching="isSearching"
      :results="citySuggestions"
      @onResultClicked="
        (result) => {
          fetchCityWeather(result.name);
          showSearchDialog = false;
        }
      "
    />
    <!-- main app header -->
    <Toolbar
      @onSearchItemClick="showSearchDialog = !showSearchDialog"
      @onGPSItemClick="fetchGps"
    />

    <!-- main app -->
    <div
      v-show="!isLoading"
      class="w-full md:flex md:space-x-8 max-sm:space-y-8"
    >
      <!--Destop left-->
      <div id="todays-specifics" class="w-full md:w-[320px] space-y-4">
        <!--Now Card section-->

        <NowCard :forecast="forecast" />

        <!-- Week forecast section-->
        <WeekForecastCard :days="forecast.forecastday" />
      </div>

      <!--Destop right-->
      <div id="todays-highlights" class="w-full borders">
        <!-- Todays Specifics section-->
        <TodaysSpecificsCard :specifics="formatWeatherSpecifics(forecast)" />

        <!-- Today's Forecast section-->
        <TodaysForecastCard
          :hours="forecast?.forecast?.forecastday?.[0]?.hour || []"
        />

        <!-- Location map section-->
        <MapCard :location="forecast.location" />
        <!-- Footer-->
        <Footer />
      </div>
    </div>
    <!-- laoding screen -->
    <Loader v-if="isLoading" />
  </App>
</template>
<style>
body {
  @apply bg-colorBackgroundLight dark:bg-colorBackgroundDark text-colorOnBackgroundLight dark:text-colorOnBackgroundDark;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

section {
  @apply w-full;
}
.grid-responsive {
  grid-area: span;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
}
.highlight {
  @apply transition-colors duration-300 cursor-pointer hover:bg-colorPrimaryContainerLight dark:hover:bg-colorPrimaryContainerDark hover:bg-opacity-20 dark:hover:bg-opacity-20;
}
/** add pulse animation to skeletons */

.pulse {
  @apply animate-pulse bg-colorPrimaryLight dark:bg-colorPrimaryDark bg-opacity-40 dark:bg-opacity-20;
}

.borders {
  @apply rounded-md border-[1.5px] dark:border-colorPrimaryDark border-colorPrimaryLight border-opacity-30 dark:border-opacity-30;
}
hr {
  @apply border-[1.2px] rounded-full dark:border-colorPrimaryDark border-colorPrimaryLight border-opacity-30 dark:border-opacity-30;
}
</style>
