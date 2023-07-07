<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - EasyAPI服务市场` : 'EasyAPI服务市场'
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
