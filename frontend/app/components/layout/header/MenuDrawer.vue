<template>
  <div>
    <!-- Mobile: Drawer + Button -->
    <div class="md:hidden">
      <a-button
        type="text"
        size="medium"
        class="flex items-center justify-center border border-slate-200 px-1"
        @click="drawerOpen = true"
      >
        <span class="material-symbols-outlined text-2xl text-slate-600">menu</span>
      </a-button>
      <a-drawer
        v-model:open="drawerOpen"
        placement="left"
        :closable="false"
        width="80vw"
        root-class-name="menu-drawer"
        :body-style="{ padding: '0px 16px' }"
      >
        <MenuContent @close="drawerOpen = false" />
      </a-drawer>
    </div>

    <!-- Desktop: Dropdown + Button -->
    <div class="hidden md:block">
      <a-dropdown
        :open="dropdownOpen"
        :trigger="['click']"
        placement="bottomLeft"
        @open-change="dropdownOpen = $event"
      >
        <a-button
          type="text"
          size="medium"
          class="flex items-center justify-center border border-slate-200 px-1"
        >
          <span class="material-symbols-outlined text-2xl text-slate-600">menu</span>
        </a-button>
        <template #overlay>
          <div class="w-[80vw] 2xl:w-[50vw] bg-white rounded-lg shadow-lg border border-slate-200 p-4 mt-2">
            <MenuContent @close="dropdownOpen = false" />
          </div>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MenuContent from './MenuContent.vue'

const drawerOpen = ref(false)
const dropdownOpen = ref(false)
</script>

<style scoped>
:deep(.menu-drawer .ant-drawer-body) {
  padding: 0;
}
</style>
