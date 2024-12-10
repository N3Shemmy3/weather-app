<script setup>
const props = defineProps({
  days: {
    type: Object,
  },
});
</script>
<template>
  <section class="w-full h-fit borders px-4 p-4 space-y-4">
    <h4 v-if="props.days" class="text-lg">3-Day Forecast</h4>
    <SkeletonText v-else />
    <ul class="flex flex-col gap-2">
      <DayForecastItem
        v-if="props.days"
        v-for="day in props.days"
        :key="day.date"
        :day="day"
      />

      <SkeletonListItem v-else v-for="n in 7" :key="n" />
    </ul>
  </section>
</template>
