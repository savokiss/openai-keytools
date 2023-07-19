<script setup>
const appConfig = useAppConfig()

useHead({
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'icon', href: '/favicon.ico' }],
})

useSeoMeta({
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  title: appConfig.title,
  description: appConfig.description,
  ogTitle: appConfig.title,
  ogDescription: appConfig.description,
  ogImage: '/social-image.png',
  twitterTitle: appConfig.title,
  twitterDescription: appConfig.description,
  twitterImage: '/social-image.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div class="w-full min-h-screen">
    <NuxtPage />
  </div>
  <UNotifications />
</template>

<style lang="less">
body {
  @apply font-sans text-gray-950 bg-gray-50 dark:bg-gray-950 dark:text-gray-50;
}
</style>
