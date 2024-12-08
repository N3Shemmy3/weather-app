<template>
  <section>
    <h4 class="text-lg">Today's Forecast</h4>
    <ul class="w-full grid grid-responsive gap-4">
      <DayForecastItem v-for="n in 5" :key="n" />
    </ul>
  </section>
</template>
