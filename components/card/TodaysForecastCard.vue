<script setup>
defineProps({
  hours: {
    type: [],
  },
});
</script>

<template>
  <section class="w-full h-fit p-4 space-y-4">
    <h4 v-if="hours" class="text-lg">Today's Forecast</h4>
    <SkeletonText v-else />
    <ul class="w-full grid grid-responsive gap-4">
      <HourForecastItem v-if="hours" v-for="hour in hours" :key="n" />
      <SkeletonListItem class="h-24" v-else v-for="n in 4" />
    </ul>
  </section>
</template>
