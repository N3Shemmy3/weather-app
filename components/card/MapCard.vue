<script setup>
defineProps({
  location: {},
});

// Set the initial style based on the current color mode
const runtimeConfig = useRuntimeConfig();
const zoom = 8;
const style = ref(
  `https://api.maptiler.com/maps/streets/style.json?key=${runtimeConfig.public.maptilerapikey}`
);
</script>

<template>
  <section class="w-full h-fit p-4 space-y-4">
    <h4 v-if="location" class="text-lg">Forecast Location</h4>
    <SkeletonText v-else />
    <div
      v-if="location"
      class="w-full h-[350px] min-h-36 rounded-md overflow-clip"
    >
      <MglMap
        :map-style="style"
        :center="[location.lat, location.lon]"
        :zoom="zoom"
      >
        <MglNavigationControl />
        <mgl-marker
          :coordinates="[location.lat, location.lon]"
          color="#cc0000"
        />
      </MglMap>
    </div>
    <SkeletonMapCard v-else />
  </section>
</template>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
