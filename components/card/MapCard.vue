<script setup>
const { value: colorMode } = useColorMode();
const style = ref("");
const center = [12.550343, 55.665957];
const zoom = 8;
const coordinates = [12.550343, 55.665957];

// Set the initial style based on the current color mode
const runtimeConfig = useRuntimeConfig();
const setMapStyle = () => {
  style.value =
    colorMode === "dark"
      ? `https://api.maptiler.com/maps/darkmatter/style.json?key=${runtimeConfig.public.maptilerapikey}` // Google-like dark theme
      : `https://api.maptiler.com/maps/streets/style.json?key=${runtimeConfig.public.maptilerapikey}}`; // Light theme
};

// Set the initial map style on mount
onMounted(() => {
  setMapStyle();
});

// Watch for color mode changes and update map style accordingly
watch(colorMode, (newColorMode) => {
  setMapStyle();
});
</script>

<template>
  <section class="w-full h-fit p-4 space-y-4">
    <h4 class="text-lg">Forecast Location</h4>
    <div class="w-full h-[350px] min-h-36 rounded-md overflow-clip">
      <MglMap :map-style="style" :center="center" :zoom="zoom">
        <MglNavigationControl />
        <mgl-marker :coordinates="coordinates" color="#cc0000" />
      </MglMap>
    </div>
  </section>
</template>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
