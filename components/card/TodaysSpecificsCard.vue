<script setup>
defineProps({
  specicifcs: {
    type: [],
  },
});
</script>

<template>
  <section class="w-full h-fit p-4 space-y-4">
    <h4 class="text-lg">Today's Highlights</h4>
    <ul class="grid flex-col md:grid-cols-2 gap-4">
      <LazySpecificsItem
        v-if="specicifcs"
        v-for="item in specicifcs"
        :key="item.title"
      />
      <SkeletonListItem v-else v-for="n in 4" />
    </ul>
  </section>
</template>
