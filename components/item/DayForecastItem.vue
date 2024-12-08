<script setup>
import { computed } from "vue";
import { format } from "date-fns"; // Import for date formatting

defineProps(["day"]);

// Extract and format date information
const date = computed(() => new Date(day.date));
const formattedDate = computed(() => format(date.value, "d MMM")); // Example: "9 Dec"
const dayOfWeek = computed(() => format(date.value, "EEEE")); // Example: "Monday"

// Icon name mapping logic (optional if dynamic)
const weatherIcon = computed(() => {
  const icons = {
    Clear: "meteocons:clear-day-fill",
    "Partly cloudy": "meteocons:cloudy-fill",
    Rain: "meteocons:rain-fill",
    // Add more conditions if needed
  };
  return icons[day.day.condition.text] || "meteocons:unknown";
});
</script>

<template>
  <li
    class="w-full px-4 py-2 flex items-center justify-between borders highlight"
  >
    <!-- Dynamically set icon based on weather condition -->
    <Icon :name="weatherIcon" size="32" />

    <!-- Temperature -->
    <h4 class="text-2xl">{{ day.day.avgtemp_c }}&deg;</h4>

    <!-- Date and Day -->
    <div>
      <h4 class="text-base">{{ formattedDate }}</h4>
      <p class="text-sm">{{ dayOfWeek }}</p>
    </div>
  </li>
</template>
