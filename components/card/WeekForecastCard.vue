<script setup>
const city = ref("London");
const forecast = ref(null);
const loading = ref(false);
const error = ref(null);

const fetchWeather = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(`/api/weather?city=${city.value}&days=7`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    forecast.value = data;
  } catch (err) {
    error.value = err.message || "Failed to fetch weather data.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchWeather();
});
</script>
<template>
  <section class="w-full h-fit borders px-4 p-4 space-y-4">
    <h4 class="text-lg">7-Day Forecast</h4>
    <ul class="flex flex-col gap-2">
      <DayForecastItem
        v-for="(day, index) in forecast.forecastday"
        :key="index"
        :day="day"
      />
    </ul>
  </section>
</template>
