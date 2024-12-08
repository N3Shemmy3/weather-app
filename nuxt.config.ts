export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
    "nuxt-maplibre",
    "@nuxtjs/color-mode",
  ],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    public: {
      weatherapikey: process.env.NUXT_WEATHERAPIKEY,
      maptilerapikey: process.env.NUXT_MAPTILERKEY,
    },
  },
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
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "-mode",
    storage: "localStorage", // or 'sessionStorage' or 'cookie'
    storageKey: "nuxt-color-mode",
  },
});
