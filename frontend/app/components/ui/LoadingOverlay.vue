<template>
  <div v-show="appStore.isMainLoading" class="absolute inset-0 z-40 flex items-center justify-center bg-surface-container-low/60 backdrop-blur-[2px] transition-all">
    <div class="flex flex-col items-center gap-4">
      <div class="relative w-12 h-12">
        <div class="absolute inset-0 rounded-full border-4 border-primary/20"></div>
        <div class="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '~/stores/app/index'
const appStore = useAppStore()
</script>
