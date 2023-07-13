export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    ['@nuxthq/ui', {
      global: true
    }]
  ],
  colorMode: {
    preference: 'light'
  },
  ui: {
    icons: ['heroicons', 'simple-icons']
  }
})
