<script setup>
useSeoMeta({
  title: "N3Shemmy3-Weather",
  ogTitle: "N3Shemmy3-Weather",
  description: "NuxtJS weather app",
  ogDescription: "NuxtJS weather app.",
});
</script>

<template>
  <App>
    <Toolbar />

    <div class="w-full md:flex md:space-x-8 max-sm:space-y-8">
      <!--Destop left-->
      <div id="todays-specifics" class="md:w-[320px] space-y-4">
        <!--Now Card section-->
        <section>
          <NowCard />
        </section>

        <!-- Week forecast section-->
        <section class="borders px-4 py-2 md:p-4 space-y-4">
          <h4 class="text-lg">7-Day Forecast</h4>
          <ul class="flex flex-col gap-2">
            <ForecastItem v-for="n in 7" />
          </ul>
        </section>
      </div>

      <!--Destop right-->
      <div
        id="todays-highlights"
        class="w-full space-y-4 borders px-4 py-2 md:p-4"
      >
        <!-- Today's Highlights side -->

        <!-- Todays Specifics -->
        <section>
          <h4 class="text-lg">Today's Highlights</h4>
          <ul class="grid flex-col md:grid-cols-2 gap-4">
            <SpecificsItem v-for="n in 4" />
          </ul>
          <h4 class="text-lg">Today's Highlights</h4>
        </section>
      </div>
    </div>
  </App>
</template>
<style>
.borders {
  @apply rounded-md border-[1.5px] dark:border-zinc-800 border-gray-200;
}
.highlight {
  @apply transition-colors duration-300 cursor-pointer hover:bg-colorPrimaryContainerLight dark:hover:bg-colorPrimaryContainerDark hover:bg-opacity-20 dark:hover:bg-opacity-20;
}
hr {
  @apply border-[1.2px] rounded-full dark:border-zinc-800 border-gray-200;
}
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
