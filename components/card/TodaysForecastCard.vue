<script setup>
defineProps({
  hours: {
    type: Array,
  },
});
</script>

<template>
  <section class="w-full h-fit p-4 space-y-4">
    <h4 v-if="hours" class="text-lg">Today's Forecast</h4>
    <SkeletonText v-else />
    <ul class="w-full grid grid-responsive gap-4">
      <HourForecastItem
        v-if="hours"
        v-for="hour in hours.slice(0, 12)"
        :key="hour.time"
        :hour="hour"
      />
      <SkeletonListItem class="h-24" v-else v-for="n in 4" />
    </ul>
  </section>
</template>
