<script setup>
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scroll effect
  });
};
</script>

<template>
  <section>
    <footer
      class="w-full flex items-center p-4 border-t-[1.5px] dark:border-zinc-800 border-gray-200"
    >
      <NuxtLink href="/" @click="scrollToTop" class="flex items-center">
        <Icon name="meteocons:dust-day" size="32" />
        <span>N3Shemmy3</span>
      </NuxtLink>
    </footer>
  </section>
</template>
