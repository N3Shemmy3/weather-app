<script setup>
const emit = defineEmits();
defineProps({
  showDialog: {
    type: Boolean,
    required: true,
    default: false,
  },
  results: {},
  isSearching: {
    type: Boolean,
  },
});
const toggleOverlay = (event) => {
  if (event.target.id == "overlay") emit("onOverlayClicked");
};

const query = ref("");
</script>

<template>
  <!-- Dialog Overlay-->
  <Transition name="slide-fade" :duration="300">
    <div
      id="overlay"
      v-show="showDialog"
      @click="(event) => toggleOverlay(event)"
      class="outer fixed z-[80] max-h-screen scroll-m-0 left-0 top-0 right-0 bottom-0 flex flex-col backdrop-blur-sm bg-black bg-opacity-60 firefox:bg-opacity-90 text-colorOnSurfaceLight dark:text-colorOnSurfaceDark"
    >
      <!-- Searchbox -->
      <div
        class="inner h-fit md:w-full md:max-w-xl mx-4 my-14 overflow-x-hidden md:mx-auto md:my-24 2xl:m-auto flex flex-col rounded-md overflow-clip divide-y-[1.5px] dark:divide-zinc-800 divide-gray-200 bg-colorSurfaceLight dark:bg-colorSurfaceDark"
      >
        <!-- Searchbox header-->
        <div
          id="searchbox"
          class="w-full min-h-14 px-2 flex items-center text-base transition-all duration-300"
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
            class="opacity-80 hidden"
            @click="query = ''"
          />
          <ProgressBar v-if="isSearching" size="28" />
        </div>

        <TransitionGroup
          name="list"
          tag="ul"
          id="results"
          class="w-full overflow-y-auto overflow-x-hidden flex flex-col gap-1"
        >
          <SearchResultItem
            v-for="result in results"
            :key="result.id"
            :result="result"
          />
        </TransitionGroup>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.slide-fade-enter-active .inner {
  transition-delay: 0.1s;
  transition: all 0.3s;
  transform: translateZ(0);
}

.slide-fade-leave-active .inner {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  transform: translateZ(0);
}
.slide-fade-enter-from .inner,
.slide-fade-leave-to .inner {
  transform: translateY(100%) translateZ(0);
  opacity: 0;
}
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: relative;
}
</style>
