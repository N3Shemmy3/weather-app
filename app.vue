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
            <LazyForecastItem v-for="n in 7" :key="n" />
          </ul>
        </section>
      </div>

      <!--Destop right-->
      <div
        id="todays-highlights"
        class="w-full space-y-4 borders px-4 py-2 md:p-4 *:space-y-4"
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
            <li
              v-for="n in 6"
              :key="n"
              class="w-fit px-4 py-2 flex flex-col text-center items-center space-y-2 borders highlight"
            >
              <Icon name="meteocons:clear-day-fill" size="36" />

              <div>
                <h4 class="text-base">23&deg;</h4>
                <h4 class="text-base">3 PM</h4>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </App>
</template>
<style src="./assets/css/tailwind.css" />
