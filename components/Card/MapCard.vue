<script setup>
const getMapStyle = () => {
  const isDarkMode = ref(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const style = ref(
    isDarkMode
      ? "https://api.maptiler.com/maps/darkmatter/style.json?key=cQX2iET1gmOW38bedbUh"
      : "https://api.maptiler.com/maps/streets/style.json?key=cQX2iET1gmOW38bedbUh"
  );
  return style;
};
const center = [-1.559482, 47.21322];
const zoom = ref(8);
</script>
<template>
  <section>
    <h4 class="text-lg">Forecast Location</h4>
    <div class="w-full h-[350px] min-h-36 rounded-md overflow-clip">
      <MglMap :map-style="getMapStyle" :center="center" :zoom="zoom">
        <MglNavigationControl />
      </MglMap>
    </div>
  </section>
</template>
