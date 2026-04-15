<template>
  <a-dropdown :trigger="['click']" placement="bottomRight">
    <a-button 
      type="text" 
      class="flex items-center gap-2 hover:bg-slate-50 px-2 py-1 rounded-full"
    >
      <span class="material-symbols-outlined text-xl">person</span>
    </a-button>
    
    <template #overlay>
      <a-menu class="w-56">
        <a-menu-item key="profile" disabled class="cursor-default">
          <div class="py-1">
            <p class="text-sm font-semibold text-slate-800">{{ authStore.user?.full_name || authStore.user?.username || 'User Profile' }}</p>
            <p class="text-xs text-slate-400 truncate">{{ authStore.user?.email || '' }}</p>
          </div>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="logout" @click="handleLogout" danger>
          <span class="material-symbols-outlined text-lg mr-2">logout</span>
          <span>{{ $t('header.logout') }}</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth/index'

const router = useRouter()
const authStore = useAuthStore()

async function handleLogout() {
  authStore.logout()
  await router.push('/login')
}
</script>
