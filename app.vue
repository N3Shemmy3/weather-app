<script setup>
import MapCard from "./components/Card/MapCard.vue";

useSeoMeta({
  title: "N3Shemmy3-Weather",
  ogTitle: "N3Shemmy3-Weather",
  description: "NuxtJS weather app",
  ogDescription: "NuxtJS weather app.",
});
const isLoading = ref(false);
const showSearchDialog = ref(false);
</script>

<template>
  <App>
    <!-- main app search dialog -->
    <SearchDialog v-if="showSearchDialog" />
    <!-- main app header -->
    <Toolbar />

    <!-- main app -->
    <div
      v-show="!isLoading"
      class="w-full md:flex md:space-x-8 max-sm:space-y-8"
    >
      <!--Destop left-->
      <div id="todays-specifics" class="w-full md:w-[320px] space-y-4">
        <!--Now Card section-->

        <NowCard />

        <!-- Week forecast section-->
        <WeekForecastCard />
      </div>

      <!--Destop right-->
      <div
        id="todays-highlights"
        class="w-full space-y-4 borders p-4 *:space-y-4"
      >
        <!-- Todays Specifics section-->
        <TodaysSpecificsCard />

        <!-- Today's Forecast section-->
        <TodaysForecastCard />
        <!-- Location map section-->
        <MapCard />
      </div>
    </div>
    <!-- laoding screen -->
    <Loader v-if="isLoading" />
  </App>
</template>
<style>
body {
  @apply bg-colorBackgroundLight dark:bg-colorBackgroundDark text-colorOnBackgroundLight dark:text-colorOnBackgroundDark;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

section {
  @apply w-full;
}
.grid-responsive {
  grid-area: span;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
}
.highlight {
  @apply transition-colors duration-300 cursor-pointer hover:bg-colorPrimaryContainerLight dark:hover:bg-colorPrimaryContainerDark hover:bg-opacity-20 dark:hover:bg-opacity-20;
}
.borders {
  @apply rounded-md border-[1.5px] dark:border-zinc-800 border-gray-200;
}
hr {
  @apply border-[1.2px] rounded-full dark:border-zinc-800 border-gray-200;
}
</style>
