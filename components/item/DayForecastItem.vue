<script setup>
import { getMeteoconIcon } from "~/classes/Utils";
import { format } from "date-fns";
const props = defineProps({
  day: {
    type: Object, // Explicitly declare the type as an array of DayWeather
    required: true,
    default: {}, // Provide a default value
  },
});
</script>

<template>
  <li
    class="w-full px-4 py-2 flex items-center justify-between borders highlight"
  >
    <!-- Dynamically set icon based on weather condition -->

    <Icon
      :name="
        getMeteoconIcon(props.day.day.condition.text, props.day.day.is_Day)
      "
      size="32"
    />

    <!-- Temperature -->
    <h4 class="text-2xl">{{ props.day.day.avgtemp_c }}&deg;</h4>

    <!-- Date and Day -->
    <div>
      <h4 class="text-base">{{ format(new Date(day.date), "d MMM") }}</h4>
      <p class="text-sm">{{ format(new Date(day.date), "EEE") }}</p>
    </div>
  </li>
</template>
