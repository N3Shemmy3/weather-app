<template>
  <section class="w-full h-fit p-4 space-y-4">
    <h4 class="text-lg">Today's Forecast</h4>
    <ul class="w-full grid grid-responsive gap-4">
      <HourForecastItem v-for="n in 5" :key="n" />
    </ul>
  </section>
</template>
