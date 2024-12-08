<template>
  <!--Toolbar header-->
  <header
    class="fixed left-0 top-0 right-0 z-50 w-full flex backdrop-filter bg-opacity-40 dark:bg-opacity-80 border-b bg-colorSurfaceLight dark:bg-colorSurfaceDark dark:border-zinc-800 border-gray-50 firefox:bg-opacity-90 backdrop-blur-lg text-colorOnSurfaceLight dark:text-colorOnSurfaceDark"
  >
    <!--div that spaces it-->
    <div
      class="xl:max-w-6xl xl:m-auto w-full px-4 py-2 flex items-center justify-between *:flex *:items-center *:space-x-1"
    >
      <!--Items start-->
      <div>
        <NuxtLink
          href="/"
          class="text-lg duration-300 cursor-pointer rounded-full hover:text-colorPrimaryLight dark:hover:text-colorPrimaryDark"
        >
          N3Shemmy3</NuxtLink
        >
      </div>

      <!--Items end-->
      <div>
        <IconButton size="24" icon="ic:outline-search" />
        <IconButton size="24" icon="ic:outline-dark-mode" />
      </div>
    </div>
  </header>
</template>
