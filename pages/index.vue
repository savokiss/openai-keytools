<script setup lang="ts">
import type { KeyData } from '~/types'
import { useStorage } from '@vueuse/core'

const toast = useToast()
const key = ref('')
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'key', label: 'Key' },
  { key: 'totalLimit', label: 'Limit' },
  { key: 'totalUsage', label: 'Usage' },
  { key: 'remaining', label: 'Remaining' },
  { key: 'expiryDate', label: 'Expire At' },
  { key: 'hasGPT4', label: 'GPT4' },
  { key: 'hasPayment', label: 'Payment' },
  { key: 'actions', label: 'Actions', class: 'px-0' }
]
const keyStore = useStorage('key-store', [] as KeyData[])
const loading = ref(false)

function showToast(msg: string, { color = 'primary' } = {}) {
  toast.add({
    title: msg,
    color: color
  })
}

function checkKeyAdded (key: string) {
  return checkRow(keyStore, key)
}

async function getUsages (key: string) {
  loading.value = true
  const { data, pending } = await useFetch('/api/openai/usage', { 
    query: {
      key
    },
  })
  loading.value = pending.value
  return data.value
}

async function doQuery () {
  if (!key.value) {
    return showToast('Please input the key.', { color: 'red' })
  }
  const validatedKey = validateKey(key.value)
  if (!validatedKey) {
    return showToast('Please check the key format.', { color: 'red' })
  }
  const isKeyAdded = checkKeyAdded(key.value)
  if (isKeyAdded) {
    return showToast('This key has added', { color: 'red' })
  }
  const res = await getUsages(validatedKey)
  res && keyStore.value.push({
    name: `Key${keyStore.value.length + 1}`,
    ...res
  })
  // cleanup input
  key.value = ''
}

function onEditName (row: KeyData) {
  const name = prompt('Enter your Name', row.name || 'Key')
  name && updateRow(keyStore, row.key, {
    name,
  })
}

async function onRefetchKey(row: KeyData) {
  const res = await getUsages(row.key)
  updateRow(keyStore, row.key, {
    name: row.name,
    ...res
  })
}

function onDeleteKey(row: KeyData) {
  const deleted = deleteRow(keyStore, row.key)
  deleted && showToast('Key has deleted')
}
</script>

<template>
  <div class="container mx-auto p-2 pt-10">
    <GithubCorner />  
    <section class="min-w-min mx-auto">
      <h1 class="text-center text-3xl font-bold font-sans">
        Tools for OpenAI API Keys
      </h1>
      <p class="text-xl text-center text-gray-500">
        Enter your key below
      </p>
    </section>

    <section class="w-full mx-auto mt-8">
      <UInput v-model="key" size="lg" placeholder="Your key here. Starts with `sk-`" />
      <UButton class="mt-4" block size="lg" color="indigo" :loading="loading" @click="doQuery">
        Query
      </UButton> 
    </section>

    <section class="w-full mx-auto mt-8 overflow-auto">
      <ClientOnly>
        <UTable 
          :columns="columns" 
          :rows="keyStore" 
        >
          <template #name-data="{ row }">
            <div class="flex items-center justify-center">
              <span>{{ row.name }}</span>
              <UButton class="ml-1" size="2xs" color="blue" variant="ghost" icon="i-heroicons-pencil-square" @click="onEditName(row)" />
            </div>
          </template>
          <template #key-data="{ row }">
            <span>
              {{ hideApiKey(row.key) }} 
            </span>
          </template>
          <template #totalLimit-data="{ row }">
            <span class="font-bold">${{ row.totalLimit }}</span>
          </template>
          <template #totalUsage-data="{ row }">
            <span class="font-bold text-orange-600">${{ row.totalUsage.toFixed(2) }}</span>
          </template>
          <template #remaining-data="{ row }">
            <span class="font-bold text-green-600">${{ row.remaining.toFixed(2) }}</span>
          </template>
          <template #hasGPT4-data="{ row }">
            <span>{{ row.hasGPT4 ? '🟢' : '❌' }}</span>
          </template>
          <template #hasPayment-data="{ row }">
            <span>{{ row.hasPayment ? '🟢' : '❌' }}</span>
          </template>
          <template #actions-data="{ row }">
            <div class="text-center">
              <UButton class="mr-2" size="xs" icon="i-heroicons-arrow-path-20-solid" :loading="loading" @click="onRefetchKey(row)" />
              <UButton size="xs" color="red" icon="i-heroicons-trash" @click="onDeleteKey(row)" />
            </div>
          </template>
        </UTable>
        <template #fallback>
          <div class="flex flex-col space-y-4">
            <USkeleton v-for="n in 5" :key="n" class="h-12 rounded-full" />
          </div>
        </template>
      </ClientOnly>
    </section>
    <AppFooter />
  </div>
</template>
