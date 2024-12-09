<script setup>
import { formatHour, getMeteoconIcon } from "~/classes/Utils";

defineProps({
  hour: { type: {} },
});
</script>

<template>
  <li
    class="w-full px-4 py-2 flex flex-col text-center items-center space-y-2 borders highlight"
  >
    <Icon :name="getMeteoconIcon(hour.condition.text, hour.is_day)" size="36" />

    <div>
      <h4 class="text-base">{{ hour.temp_c }} &deg;</h4>
      <h4 class="text-base text-nowrap">{{ formatHour(hour.time) }}</h4>
    </div>
  </li>
</template>
