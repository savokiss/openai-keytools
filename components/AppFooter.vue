<template>
  <ClientOnly>
    <div class="fixed inset-x-0 bottom-10 mx-auto w-100 p-2 text-center">
      <p class="text-gray-400 text-sm">
        Current IP: {{ data?.ip }} ({{ data?.province }} {{ data?.city }} {{ data?.distinct }} {{ data?.isp }})
      </p>
    </div>
    <template #fallback>
      <USkeleton class="fixed inset-x-0 bottom-10 w-1/4 mx-auto h-6 rounded-full" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { LocationInfo } from '@/types'

const { data } = useFetch<LocationInfo>('https://forge.speedtest.cn/api/location/info')
</script>