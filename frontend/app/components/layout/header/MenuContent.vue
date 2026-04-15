<template>
  <!-- Tabs -->
  <a-tabs v-model:activeKey="activeTab">
    <a-tab-pane v-for="group in headerStore.menuGroups" :key="group.title">
      <template #tab>
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-lg">{{ group.icon }}</span>
          <span>{{ $t(group.title) }}</span>
        </div>
      </template>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
        <NuxtLink
          v-for="item in group.items"
          :key="item.label"
          :to="group.prefix + (item.path || '/')"
          @click="$emit('close')"
          class="flex flex-col items-center gap-2 p-4 rounded-lg transition-colors hover:bg-blue-50"
          :class="isActive(group.prefix + (item.path || '/')) ? 'bg-blue-50 text-blue-600' : 'text-slate-600'"
        >
          <span class="material-symbols-outlined text-4xl">
            {{ item.icon }}
          </span>
          <span class="text-sm font-medium text-center">{{ $t(item.label) }}</span>
        </NuxtLink>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useHeaderStore } from '~/stores/header/index'
import { useRoute } from 'vue-router'

defineEmits(['close'])

const headerStore = useHeaderStore()
const route = useRoute()

const activeTab = ref('')

const isActive = (path) => route.path === path

// Set default active tab when component mounts
watch(() => headerStore.menuGroups, (groups) => {
  if (groups.length > 0 && !activeTab.value) {
    activeTab.value = groups[0].title
  }
}, { immediate: true })
</script>
