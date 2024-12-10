<script setup>
import { weatherApiBaseUrl, weatherEndPoints } from "~/classes/WeatherApi";
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
const citySuggestions = ref([]); // City suggestions
const isLoading = ref(false); // Loading state
const showSearchDialog = ref(false);
const isSearching = ref(false);
let debounceTimer = null; // To store the timer ID
const runtimeConfig = useRuntimeConfig();
// Fetch city suggestions
const fetchCitySuggestions = async () => {
  // Validate search query
  if (!searchQuery.value.trim()) {
    citySuggestions.value = [];
    return;
  }

  isSearching.value = true;

  // Clear the previous debounce timer if it exists
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  // Set a new debounce timer for delayed fetching
  debounceTimer = setTimeout(async () => {
    try {
      const url = new URL(weatherApiBaseUrl + weatherEndPoints.search);
      url.searchParams.append("key", runtimeConfig.public.weatherapikey);
      url.searchParams.append("q", searchQuery.value);

      const response = await fetch(url.toString());

      if (!response.ok) {
        console.log(`HTTP Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      citySuggestions.value = data || [];
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      citySuggestions.value = [];
    } finally {
      isSearching.value = false;
    }
  }, 300); // Delay in ms (300ms)
};

const fetchCityWeather = async (city, days = 7) => {
  if (!city) return;
  isLoading.value = true;
  try {
    // Construct the URL for the weather API
    const url = `${weatherApiBaseUrl}${weatherEndPoints.forecast}?key=${runtimeConfig.public.weatherapikey}&q=${city}&days=${days}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.log(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    forecast.value = data; // Assign the parsed data
    // console.log(forecast.value); // Log the forecast data for debugging
  } catch (err) {
    error.value = err.message;
    console.log(error.value);
  } finally {
    isLoading.value = false;
  }
};

const fetchWeatherByCoords = async (lat, lon, days = 7) => {
  isLoading.value = true;
  try {
    const url = `${weatherApiBaseUrl}${weatherEndPoints.forecast}?key=${runtimeConfig.public.weatherapikey}&q=${lat},${lon}&days=${days}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.log(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    forecast.value = data; // Assign the parsed data
  } catch (err) {
    error.value = err.message;
    console.log(error.value);
  } finally {
    isLoading.value = false;
  }
};

const fetchGps = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude, 7);
        //console.log(latitude, longitude);
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
const fetchData = () => {
  if (searchQuery.value) fetchCityWeather(searchQuery.value, 7);
  else fetchGps();
};
// Add event listeners
window.addEventListener("online", fetchData);

// Cleanup listeners when the component is destroyed
onUnmounted(() => {
  window.removeEventListener("online", fetchData);
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
        <WeekForecastCard :days="forecast?.forecast?.forecastday || []" />
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
    <Snackbar />
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
