<script setup lang="ts">
import type { KeyData } from '~/types'

const toast = useToast()
const key = ref('')
const columns = [
  { key: 'key', label: 'Key' },
  { key: 'totalLimit', label: 'Limit' },
  { key: 'totalUsage', label: 'Usage' },
  { key: 'remaining', label: 'Remain' },
  { key: 'expiryDate', label: 'Expire At' },
  { key: 'hasGPT4', label: 'GPT-4' },
  { key: 'hasPayment', label: 'Payment' },
]
const keyList = ref<KeyData[]>([])

function showToast(msg: string, { color = 'primary' } = {}) {
  toast.add({
    title: msg,
    color: color
  })
}

async function getUsages (key: string) {
  const { data } = await useFetch<KeyData>('/api/openai/usage', { 
    query: {
      key
    },
  })
  return data.value
}

async function doQuery () {
  if (!key.value) {
    showToast('Please input the key.', { color: 'red' })
  }
  const res = await getUsages(key.value)
  res && keyList.value.push({
    ...res
  })
}
</script>

<template>
  <div class="container mx-auto pt-10">
    <section class="min-w-min mx-auto">
      <h1 class="text-center text-3xl font-bold font-sans">
        Tools for OpenAI API Keys
      </h1>
      <p class="text-xl text-center text-gray-500">
        Enter your key below
      </p>
    </section>

    <section class="min-w-min mx-auto mt-8">
      <UInput v-model="key" size="lg" placeholder="Your key here. Starts with `sk-`" />
      <UButton class="mt-4" block size="lg" color="indigo" @click="doQuery">
        Query
      </UButton> 
    </section>

    <section class="min-w-min mx-auto mt-8 overflow-auto">
      <UTable 
        :columns="columns" 
        :rows="keyList" 
      >
        <template #key-data="{ row }">
          <span>{{ hideApiKey(row.key) }}</span>
        </template>
        <template #totalUsage-data="{ row }">
          <span>{{ row.totalUsage.toFixed(2) }}</span>
        </template>
        <template #remaining-data="{ row }">
          <span>{{ row.remaining.toFixed(2) }}</span>
        </template>
        <template #hasGPT4-data="{ row }">
          <span>{{ row.hasGPT4 ? '🟢' : '❌' }}</span>
        </template>
        <template #hasPayment-data="{ row }">
          <span>{{ row.hasPayment ? '🟢' : '❌' }}</span>
        </template>
      </UTable>
    </section>
  </div>
</template>
