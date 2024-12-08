<script></script>

<template>
  <!-- Dialog Overlay-->
  <div
    class="fixed z-[80] max-h-screen scroll-m-0 left-0 top-0 right-0 bottom-0 flex flex-col backdrop-blur-sm bg-black bg-opacity-60 firefox:bg-opacity-90 text-colorOnSurfaceLight dark:text-colorOnSurfaceDark"
  >
    <!-- Searchbox -->
    <div
      class="h-fit sm:max-w-xl mx-4 my-14 md:mx-auto md:my-24 2xl:m-auto flex flex-col rounded-md overflow-clip divide-y-[1.5px] dark:divide-zinc-800 divide-gray-200 bg-colorSurfaceLight dark:bg-colorSurfaceDark"
    >
      <!-- Searchbox header-->
      <div
        id="searchbox"
        class="w-full py-2 px-4 flex items-center space-x-4 text-base"
      >
        <Icon name="ic:outline-search" size="24" class="p-4 opacity-50" />
        <input
          placeholder="Search city"
          class="w-full min-0 max-w-fit bg-transparent outline-none border-none placeholder:text-colorOnSurfaceLight placeholder:dark:text-colorOnSurfaceDark placeholder:text-opacity-50 dark:placeholder:text-opacity-50"
        />
        <IconButton icon="ic:outline-close" />
        <ProgressBar size="42" />
      </div>

      <ul id="results" class="w-full overflow-y-auto flex flex-col gap-1">
        <SearchResultItem v-for="n in 4" :key="n" />
      </ul>
    </div>
  </div>
</template>
