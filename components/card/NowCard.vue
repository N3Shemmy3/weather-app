<script setup>
import { formatDate, getMeteoconIcon } from "~/classes/Utils";

defineProps({
  forecast: {},
});
</script>
<template>
  <section class="w-full h-fit">
    <div
      v-if="forecast.current"
      class="w-full aspect-square h-fit flex flex-col justify-center p-4 space-y-2 rounded-md borders"
    >
      <h4 class="text-lg md:text-xl">Now</h4>

      <!--Current city temp icon-->
      <Icon
        :name="
          getMeteoconIcon(
            forecast.current.condition.text,
            forecast.current.is_day
          )
        "
        size="140"
        class="mx-auto"
      />
      <!--Current city temp-->
      <h2 id="today-current-temp" class="text-5xl">
        {{ forecast.current.temp_c }}<sup>&deg;</sup
        ><span class="text-xl">C</span>
      </h2>
      <h4 id="today-current-condition" class="text-base">
        {{ forecast.current.condition.text }}
      </h4>

      <h4 id="today-current-city" class="flex space-x-1 items-center text-base">
        <Icon name="ic:outline-calendar-month" size="20" />
        <span>{{ formatDate(forecast.location.localtime) }}</span>
      </h4>
      <h4 id="today-current-city" class="flex space-x-1 items-center text-base">
        <Icon name="ic:outline-location-on" size="20" />
        <span>
          {{ forecast.location.name }}, {{ forecast.location.country }}
        </span>
      </h4>
    </div>
    <SkeletonNowCard v-else />
  </section>
</template>
