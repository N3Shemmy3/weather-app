<script setup>
useSeoMeta({
  title: "N3Shemmy3-Weather",
  ogTitle: "N3Shemmy3-Weather",
  description: "NuxtJS weather app",
  ogDescription: "NuxtJS weather app.",
});
const isLoading = ref(false);
const showSearchDialog = ref(false);

const style =
  "https://api.maptiler.com/maps/streets/style.json?key=cQX2iET1gmOW38bedbUh";
const center = [-1.559482, 47.21322];
const zoom = 8;
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
      <div id="todays-specifics" class="md:w-[320px] space-y-4">
        <!--Now Card section-->
        <section>
          <NowCard />
        </section>

        <!-- Week forecast section-->
        <section class="borders px-4 p-4 space-y-4">
          <h4 class="text-lg">7-Day Forecast</h4>
          <ul class="flex flex-col gap-2">
            <LazyForecastItem v-for="n in 7" :key="n" />
          </ul>
        </section>
      </div>

      <!--Destop right-->
      <div
        id="todays-highlights"
        class="w-full space-y-4 borders p-4 *:space-y-4"
      >
        <!-- Today's Highlights side -->

        <!-- Todays Specifics section-->
        <section>
          <h4 class="text-lg">Today's Highlights</h4>
          <ul class="grid flex-col md:grid-cols-2 gap-4">
            <LazySpecificsItem v-for="n in 4" :key="n" />
          </ul>
        </section>

        <!-- Today's Forecast section-->
        <section>
          <h4 class="text-lg">Today's Forecast</h4>
          <ul class="w-full grid grid-responsive gap-4">
            <DayForecastItem v-for="n in 5" :key="n" />
          </ul>
        </section>
        <!-- Location map section-->
        <section>
          <h4 class="text-lg">Forecast Location</h4>
          <MglMap :map-style="style" :center="center" :zoom="zoom">
            <MglNavigationControl />
          </MglMap>
        </section>
      </div>
    </div>
    <!-- laoding screen -->
    <Loader v-if="isLoading" />
  </App>
</template>
<style>
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
