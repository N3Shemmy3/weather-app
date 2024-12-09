<script setup>
defineProps({
  week: {
    type: [],
  },
});
</script>
<template>
  <section class="w-full h-fit borders px-4 p-4 space-y-4">
    <h4 class="text-lg">7-Day Forecast</h4>
    <ul class="flex flex-col gap-2">
      <DayForecastItem
        v-if="week"
        v-for="day in week"
        :key="day.date"
        :day="day"
      />

      <SkeletonListItem v-else v-for="n in 7" :key="n" />
    </ul>
  </section>
</template>
