export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  app: {
    buildAssetsDir: "/app/",
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "https://api.iconify.design/meteocons:dust-day.svg?color=%23888888",
        },
      ],
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxt/icon", "@nuxtjs/tailwindcss"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
