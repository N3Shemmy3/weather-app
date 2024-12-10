<script setup>
const props = defineProps({
  location: {},
});

// Set the initial style based on the current color mode
const runtimeConfig = useRuntimeConfig();
const zoom = 8;
const style = ref(
  `https://api.maptiler.com/maps/streets-v2/style.json?key=${runtimeConfig.public.maptilerapikey}`
);
onMounted(() => {
  console.log(props.location);
});
</script>

<template>
  <section class="w-full h-fit p-4 space-y-4">
    <h4 v-if="props.location" class="text-lg">Forecast Location</h4>
    <SkeletonText v-else />
    <div
      v-if="props.location"
      class="w-full h-[350px] min-h-36 rounded-md overflow-clip"
    >
      <MglMap
        :map-style="style"
        :center="[props.location.lat, props.location.lon]"
        :zoom="zoom"
      >
        <MglNavigationControl />
        <mgl-marker
          :coordinates="[props.location.lat, props.location.lon]"
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
