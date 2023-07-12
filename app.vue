<script setup>
const { loggedIn } = useUserSession()
const appConfig = useAppConfig()

watch(loggedIn, () => {
  if (!loggedIn.value) {
    navigateTo('/')
  }
})

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
})
</script>

<template>
  <div class="min-h-screen">
    <NuxtPage />
  </div>
  <UNotifications />
</template>

<style lang="less">
body {
  @apply font-sans text-gray-950 bg-gray-50 dark:bg-gray-950 dark:text-gray-50;
}
</style>
