<script setup>
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scroll effect
  });
};

const links = [
  {
    name: "ICU Zambia",
    url: "http://www.icuzambia.net",
  },
  {
    name: "ZRDC",
    url: "https://www.zrdc.org",
  },
];
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

      <!-- Quick Links-->
      <div class="space-y-1">
        <h4>Quick Links</h4>
        <ul class="flex flex-col gap-1">
          <li
            v-for="link in links"
            :key="link.url"
            class="flex items-center space-x-2 transition cursor-pointer hover:text-colorPrimaryLight dark:hover:text-colorPrimaryDark"
          >
            <Icon name="ic:outline-launch" size="20" />
            <NuxtLink :href="link.url">{{ link.name }}</NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Quick Links-->
      <div class="space-y-1">
        <ul>
          <li>Kanyama ward</li>
          <li>All Rights Reserved. Designed and Maintained By</li>
          <li>Shem Nyirenda, 2308822137</li>
        </ul>
      </div>
    </footer>
  </section>
</template>
