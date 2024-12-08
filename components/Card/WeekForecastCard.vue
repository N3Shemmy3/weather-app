<template>
  <section class="borders px-4 p-4 space-y-4">
    <h4 class="text-lg">7-Day Forecast</h4>
    <ul class="flex flex-col gap-2">
      <LazyForecastItem v-for="n in 7" :key="n" />
    </ul>
  </section>
</template>
