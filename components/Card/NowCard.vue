<script setup></script>
<template>
  <section
    class="aspect-square max-w-fit flex flex-col justify-center p-4 space-y-2 rounded-md border-[1.5px] dark:border-zinc-800 border-gray-200"
  >
    <h4 class="text-lg md:text-xl">Now</h4>
    <div class="w-full flex justify-between items-center">
      <!--Current city temp-->
      <h2 id="today-current-temp" class="text-8xl">
        25<sup>&deg;</sup><span class="text-5xl">C</span>
      </h2>
      <!--Current city temp icon-->
      <Icon name="meteocons:clear-day-fill" size="120" />
    </div>

    <h4 id="today-current-condition" class="text-lg">Cloudy</h4>
    <hr />
    <h4
      id="today-current-city"
      class="flex space-x-1 items-center text-base md:text-lg"
    >
      <Icon name="ic:outline-calendar-month" size="24" />
      <span> Sunday 8, Dec</span>
    </h4>
    <h4
      id="today-current-city"
      class="flex space-x-1 items-center text-base md:text-lg"
    >
      <Icon name="ic:outline-location-on" size="24" />
      <span> Lusaka, Zambia </span>
    </h4>
  </section>
</template>
