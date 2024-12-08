<template>
  <App>
    <Toolbar />

    <div class="w-full md:flex md:space-x-8">
      <!--Destop left-->
      <section
        id="todays-specifics"
        class="sticky top-0 md:w-[320px] space-y-4"
      >
        <!--Now Card-->
        <NowCard />
      </section>
      <!--Destop right-->
      <section id="todays-" class="w-full space-y-4">
        <!--Now Card-->
        <NowCard v-for="n in 10" />
      </section>
    </div>
  </App>
</template>
<style>
hr {
  @apply border-[1.2px] rounded-full dark:border-zinc-800 border-gray-200;
}
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
