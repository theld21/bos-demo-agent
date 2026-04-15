<template>
  <a-drawer
    v-model:open="visible"
    placement="left"
    :closable="false"
    :width="300"
    root-class-name="menu-drawer"
  >
    <!-- Drawer Header -->
    <div class="flex items-center gap-3 px-4 py-4 border-b border-slate-200">
      <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
        B
      </div>
      <h1 class="text-lg font-bold text-slate-800">BOS AGENT</h1>
    </div>

    <!-- Menu Groups -->
    <div class="py-4">
      <div v-for="group in appStore.menuGroups" :key="group.title" class="mb-6">
        <h2 class="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          {{ $t(group.title) }}
        </h2>
        <div class="space-y-1">
          <NuxtLink
            v-for="item in group.items"
            :key="item.label"
            :to="group.prefix + (item.path || '/')"
            @click="visible = false"
            class="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors"
            :class="isActive(group.prefix + (item.path || '/')) ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'"
          >
            <span class="material-symbols-outlined text-xl">
              {{ item.icon }}
            </span>
            <span class="text-sm font-medium">{{ $t(item.label) }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </a-drawer>
</template>

<script setup>
import { useAppStore } from '~/stores/app'
import { useRoute } from 'vue-router'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const appStore = useAppStore()
const route = useRoute()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const isActive = (path) => route.path === path
</script>

<style scoped>
:deep(.menu-drawer .ant-drawer-body) {
  padding: 0;
}
</style>
