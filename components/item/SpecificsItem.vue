<script setup>
defineProps({
  specific: Object,
});
</script>

<template>
  <li
    class="h-fit w-full flex items-center space-x-8 px-4 py-2 borders highlight"
  >
    <div
      class="w-6/12 h-full flex border-e-[1.5px] dark:border-zinc-800 border-gray-200"
    >
      <Icon :name="specific.icon" size="64" class="m-auto" />
    </div>
    <div class="w-full items-center">
      <p class="text-2xl">{{ specific.value }}</p>
      <h4 class="text-lg">{{ specific.name }}</h4>
    </div>
  </li>
</template>
