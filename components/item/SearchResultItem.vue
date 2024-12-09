<script setup>
defineProps({ result: {} });
</script>

<template>
  <li class="w-full flex items-center space-x-4 px-4 py-2 highlight">
    <Icon name="ic:outline-location-on" size="24" />

    <div class="-space-y-1">
      <h4 class="text-base">{{ result.name }}</h4>
      <p class="text-sm opacity-50">{{ result.country }}</p>
    </div>
  </li>
</template>
