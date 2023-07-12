<script setup lang="ts">


const toast = useToast()
const key = ref('')
const columns = [
  { key: 'key', label: 'Key' },
  { key: 'system_hard_limit_usd', label: 'TotalLimit' },
  { key: 'card', label: 'Used' },
  { key: 'card', label: 'Avaliable' },
  { key: 'card', label: 'Has Payment' },
]
const keyList = ref([])

function showToast(msg: string, { color = 'primary' } = {}) {
  toast.add({
    title: msg,
    color: color
  })
}

async function getSubscription (key: string) {
  const { data } = await useFetch('/api/openai/subscription', { 
    query: {
      key
    },
    pick: ['subscription']
  })
  console.log('res', data.value)
  return data.value?.subscription
}

async function doQuery () {
  if (!key.value) {
    showToast('Please input the key.', { color: 'red' })
  }
  const sub = await getSubscription(key.value)
}

</script>

<template>
  <div class="container mx-auto pt-10">
    <section class="min-w-min mx-auto">
      <h1 class="text-center text-3xl font-bold font-sans">
        Tools for OpenAI API Keys
      </h1>
      <p class="text-xl text-center text-gray-500">
        Enter your key below to query.
      </p>
    </section>

    <section class="min-w-min mx-auto mt-8">
      <UInput v-model="key" size="lg" placeholder="Your key here." />
      <UButton class="mt-4" block size="lg" @click="doQuery">
        Query
      </UButton> 
    </section>

    <section class="min-w-min mx-auto mt-8">
      <UTable :columns="columns" :rows="keyList" />
    </section>
  </div>
</template>
