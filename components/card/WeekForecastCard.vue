<script setup>
const props = defineProps({
  days: {
    type: Object,
  },
});
onMounted(() => {});
console.log(props.days);
</script>
<template>
  <section class="w-full h-fit borders px-4 p-4 space-y-4">
    <h4 v-if="days" class="text-lg">7-Day Forecast</h4>
    <SkeletonText v-else />
    <ul class="flex flex-col gap-2">
      <DayForecastItem
        v-if="days"
        v-for="day in days"
        :key="day.date"
        :day="day"
      />
      <SkeletonListItem v-else v-for="n in 7" :key="n" />
      {{
        days
      }}
    </ul>
  </section>
</template>
