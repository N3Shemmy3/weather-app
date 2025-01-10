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
      class="w-full flex flex-col text-sm p-4 space-y-4 border-t-[1.5px] dark:border-zinc-800 border-gray-200"
    >
      <NuxtLink
        href="/"
        @click="scrollToTop"
        class="flex items-center text-base duration-300 cursor-pointer hover:text-colorPrimaryLight dark:hover:text-colorPrimaryDark"
      >
        <Icon name="meteocons:dust-day" size="32" />
        <span>N3Shemmy3</span>
      </NuxtLink>
      <!-- info-->
      <div class="space-y-2">
        <ul>
          <li>All Rights Reserved. Designed and Maintained By</li>
          <li>Shemmy Nyirenda</li>
        </ul>
      </div>
    </footer>
  </section>
</template>
