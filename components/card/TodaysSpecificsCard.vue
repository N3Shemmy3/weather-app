<script setup>
defineProps({
  specifics: {
    type: [],
  },
});
</script>

<template>
  <section class="w-full h-fit p-4 space-y-4">
    <h4 v-if="specifics" class="text-lg">Today's Highlights</h4>
    <SkeletonText v-else />
    <ul class="grid flex-col md:grid-cols-2 gap-4">
      <LazySpecificsItem
        v-if="specifics[0]"
        v-for="specific in specifics"
        :specific="specific"
        :key="specific.title"
      />
      <SkeletonListItem v-else v-for="n in 4" />
    </ul>
  </section>
</template>
