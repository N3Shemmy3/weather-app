<script setup>
const emit = defineEmits();
defineProps({
  results: {},
  isSearching: {
    type: Boolean,
  },
});
function toggleOverlay(event) {
  if (event.id == "overlay") emit("onOverlayClicked");
}

const query = ref("");
</script>

<template>
  <!-- Dialog Overlay-->
  <div
    id="overlay"
    @click="toggleOverlay($event)"
    class="fixed z-[80] max-h-screen scroll-m-0 left-0 top-0 right-0 bottom-0 flex flex-col backdrop-blur-sm bg-black bg-opacity-60 firefox:bg-opacity-90 text-colorOnSurfaceLight dark:text-colorOnSurfaceDark"
  >
    <!-- Searchbox -->
    <div
      id="Searchbox"
      class="h-fit md:w-full md:max-w-xl mx-4 my-14 md:mx-auto md:my-24 2xl:m-auto flex flex-col rounded-md overflow-clip divide-y-[1.5px] dark:divide-zinc-800 divide-gray-200 bg-colorSurfaceLight dark:bg-colorSurfaceDark"
    >
      <!-- Searchbox header-->
      <div
        id="searchbox"
        class="w-full min-h-14 px-2 flex items-center space-x-4 text-base transition-all duration-300"
      >
        <IconButton icon="ic:outline-search" class="opacity-80" />

        <input
          v-model="query"
          @input="emit('onQueryChanged', query)"
          placeholder="Search city"
          class="flex-grow h-full min-w-0 bg-transparent outline-none border-none placeholder:text-colorOnSurfaceLight placeholder:dark:text-colorOnSurfaceDark placeholder:text-opacity-80 dark:placeholder:text-opacity-80"
        />
        <IconButton
          v-if="query.length > 2"
          icon="ic:outline-close"
          class="opacity-80"
          @click="query = ''"
        />
        <ProgressBar v-if="isSearching" size="28" />
      </div>

      <ul id="results" class="w-full overflow-y-auto flex flex-col gap-1">
        <SearchResultItem v-for="result in results" :key="result.country" />
      </ul>
    </div>
  </div>
</template>
