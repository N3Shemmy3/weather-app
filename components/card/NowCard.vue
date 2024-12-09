<script setup></script>
<template>
  <section
    class="w-full aspect-square h-fit flex flex-col justify-center p-4 space-y-2 rounded-md borders"
  >
    <h4 class="text-lg md:text-xl">Now</h4>

    <!--Current city temp icon-->
    <Icon name="meteocons:clear-day-fill" size="140" class="mx-auto" />
    <!--Current city temp-->
    <h2 id="today-current-temp" class="text-5xl">
      25<sup>&deg;</sup><span class="text-xl">C</span>
    </h2>
    <h4 id="today-current-condition" class="text-base">Cloudy</h4>

    <h4 id="today-current-city" class="flex space-x-1 items-center text-base">
      <Icon name="ic:outline-calendar-month" size="20" />
      <span> Sunday 8, Dec</span>
    </h4>
    <h4 id="today-current-city" class="flex space-x-1 items-center text-base">
      <Icon name="ic:outline-location-on" size="20" />
      <span> Lusaka, Zambia </span>
    </h4>
  </section>
</template>
