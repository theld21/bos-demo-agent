<template>
  <nav class="flex items-center gap-2 text-[0.6875rem] font-bold text-outline uppercase tracking-widest mb-3">
    <template v-for="(item, index) in items" :key="index">
      <NuxtLink v-if="item.to" :to="item.to" class="hover:text-primary transition-colors">
        {{ item.label }}
      </NuxtLink>
      <span v-else class="text-on-surface-variant">{{ item.label }}</span>
      <span v-if="index < items.length - 1" class="material-symbols-outlined text-[10px]">chevron_right</span>
    </template>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>
