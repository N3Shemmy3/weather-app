<script setup>
defineProps({
  week: {
    type: Array,
  },
});
</script>
<template>
  <section class="w-full h-fit borders px-4 p-4 space-y-4">
    <h4 v-if="week" class="text-lg">7-Day Forecast</h4>
    <SkeletonText v-else />
    <ul class="flex flex-col gap-2">
      <DayForecastItem
        v-if="week[0] != undefined"
        v-for="day in week"
        :key="day.date"
        :day="day"
      />

      <SkeletonListItem v-else v-for="n in 7" :key="n" />
    </ul>
  </section>
</template>
