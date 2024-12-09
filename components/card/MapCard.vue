<script setup>
const { value: colorMode } = useColorMode();

// Set the initial style based on the current color mode
const runtimeConfig = useRuntimeConfig();
const zoom = 8;
const coordinates = ref([0, 0]);
const style = ref(
  `https://api.maptiler.com/maps/streets/style.json?key=${runtimeConfig.public.maptilerapikey}}`
);

// Watch for color mode changes and update map style accordingly
watch(colorMode, (newColorMode) => {
  setMapStyle();
});
</script>

<template>
  <section class="w-full h-fit p-4 space-y-4">
    <h4 class="text-lg">Forecast Location</h4>
    <div
      v-if="coordinates[0] + coordinates[0] != 0"
      class="w-full h-[350px] min-h-36 rounded-md overflow-clip"
    >
      <MglMap :map-style="style" :center="coordinates" :zoom="zoom">
        <MglNavigationControl />
        <mgl-marker :coordinates="coordinates" color="#cc0000" />
      </MglMap>
    </div>
    <SkeletonMapCard v-else />
  </section>
</template>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
