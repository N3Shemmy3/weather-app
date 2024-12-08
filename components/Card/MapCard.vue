<script setup>
const style = ref("");
const center = [12.550343, 55.665957];
const zoom = 8;
const coordinates = [12.550343, 55.665957];
onMounted(() => {
  const isDarkMode = ref(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  style.value = isDarkMode
    ? "https://api.maptiler.com/maps/darkmatter/style.json?key=cQX2iET1gmOW38bedbUh"
    : "https://api.maptiler.com/maps/streets-v2/style.json?key=cQX2iET1gmOW38bedbUh";
});
</script>
<template>
  <section class="w-full h-fit">
    <h4 class="text-lg">Forecast Location</h4>
    <div class="w-full h-[350px] min-h-36 rounded-md overflow-clip">
      <MglMap :map-style="getMapStyle" :center="center" :zoom="zoom">
        <MglNavigationControl />
        <mgl-marker :coordinates="coordinates" color="#cc0000" />
      </MglMap>
    </div>
  </section>
</template>
<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>
