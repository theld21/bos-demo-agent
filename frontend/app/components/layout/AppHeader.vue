<template>
  <header class="h-16 min-h-16 px-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-40">
    <!-- Left: Menu Button + Logo -->
    <div class="flex items-center gap-3">
      <a-button 
        type="text" 
        size="large"
        class="flex items-center justify-center"
        @click="menuDrawerOpen = true"
      >
        <span class="material-symbols-outlined text-2xl text-slate-600">menu</span>
      </a-button>
      
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
          B
        </div>
        <span class="text-lg font-bold text-slate-800">BOS AGENT</span>
      </div>
    </div>

    <!-- Right Actions -->
    <div class="flex items-center gap-3">
      <!-- Language -->
      <div 
        @click="toggleLanguage"
        class="w-16 flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-medium cursor-pointer hover:bg-slate-100 select-none"
      >
        <ClientOnly>
          <img :src="locale === 'vi' ? 'https://flagcdn.com/w20/vn.png' : 'https://flagcdn.com/w20/us.png'" class="w-4 h-3 object-cover rounded-[1px]" :alt="locale === 'vi' ? 'VN' : 'US'" />
          <span>{{ locale === 'vi' ? 'VI' : 'EN' }}</span>
          <template #fallback>
            <div class="w-4 h-3 bg-slate-200 rounded-[1px]"></div>
            <span>...</span>
          </template>
        </ClientOnly>
      </div>

      <!-- User Profile Dropdown -->
      <a-dropdown :trigger="['click']" placement="bottomRight">
        <a-button 
          type="text" 
          class="flex items-center gap-2 px-2 hover:bg-slate-50"
        >
          <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            {{ authStore.user?.username?.charAt(0)?.toUpperCase() || 'U' }}
          </div>
          <span class="material-symbols-outlined text-slate-400">expand_more</span>
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
    </div>

    <!-- Menu Drawer -->
    <HeaderMenuDrawer v-model="menuDrawerOpen" />
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useI18n } from 'vue-i18n'
import HeaderMenuDrawer from './header/MenuDrawer.vue'

const router = useRouter()
const authStore = useAuthStore()
const { locale } = useI18n()

const menuDrawerOpen = ref(false)

async function handleLogout() {
  authStore.logout()
  await router.push('/login')
}

function toggleLanguage() {
  locale.value = locale.value === 'vi' ? 'en' : 'vi'
  localStorage.setItem('i18n_locale', locale.value)
}
</script>
