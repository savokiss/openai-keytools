<script setup lang="ts">
const { loggedIn } = useUserSession()
const toast = useToast()

function showToast() {
  toast.add({
    title: 'Test Toast',
  })
}
</script>

<template>
  <div class="container ">
    <h2 class="text-center">
      Home
    </h2>

    <div class="text-center">
      <UButton class="mt-2" size="lg" @click="showToast">
        Toast
      </UButton> 
    </div>
  </div>
</template>
