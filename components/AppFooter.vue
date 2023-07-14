<template>
  <div class="w-100 inset-x-0 mx-auto p-2 text-center fixed bottom-10">
    <p class="text-gray-400 text-sm">
      Current IP: {{ data?.ip }} ({{ data?.province }} {{ data?.city }} {{ data?.distinct }} {{ data?.isp }})
    </p>
  </div>
</template>

<script setup lang="ts">
import type { LocationInfo } from '@/types'

const { data } = useFetch<LocationInfo>('https://forge.speedtest.cn/api/location/info')
</script>