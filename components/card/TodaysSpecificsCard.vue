<template>
  <section class="w-full h-fit p-4 space-y-4">
    <h4 class="text-lg">Today's Highlights</h4>
    <ul class="grid flex-col md:grid-cols-2 gap-4">
      <LazySpecificsItem v-for="n in 4" :key="n" />
    </ul>
  </section>
</template>
