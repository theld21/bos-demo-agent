<template>
  <aside 
    class="h-screen fixed left-0 top-0 flex flex-col font-Inter z-50 transition-all duration-300 border-r sidebar-scroll overflow-y-auto"
    :class="[isCollapsed ? 'w-[70px]' : 'w-[280px]']"
    :style="{ backgroundColor: sidebarStyles.bg, borderColor: sidebarStyles.border, color: sidebarStyles.textMain }"
  >
    <!-- Toggle Button -->
    <button 
      @click="toggleSidebar"
      class="fixed w-6 h-6 rounded-full border flex items-center justify-center shadow-sm z-[100] transition-all"
      :style="{ 
        left: isCollapsed ? '58px' : '268px', 
        top: '18px', 
        transition: 'left 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: '#ffffff',
        borderColor: '#64748b',
        color: '#64748b'
      }"
    >
      <span class="material-symbols-outlined text-[18px] transition-transform duration-300" :class="{ 'rotate-180': !isCollapsed }">
        keyboard_double_arrow_right 
      </span>
    </button>

    <!-- Header -->
    <div class="h-16 shrink-0 flex items-center px-4 mb-2 sticky top-0 z-10 border-b" :class="isCollapsed ? 'justify-center px-0' : 'gap-3'" :style="{ backgroundColor: sidebarStyles.bg, borderColor: sidebarStyles.border }">
      <div class="w-9 h-9 flex items-center justify-center font-bold text-white shrink-0 shadow-sm rounded-xl" :style="{ backgroundColor: sidebarStyles.activeBg }">
        <span class="text-lg">B</span>
      </div>
      <h1 v-show="showText" class="text-[1.25rem] font-extrabold tracking-tight" :style="{ color: sidebarStyles.activeBg }">BOS AGENT</h1>
    </div>

    <!-- Navigation Groups -->
    <div class="flex-1 px-2 space-y-6 overflow-x-hidden pb-10 mt-2">
      <div v-for="group in appStore.menuGroups" :key="group.title" class="w-full">
        <h2 
          v-show="showText"
          class="px-3 text-[0.7rem] font-bold uppercase tracking-widest mb-2"
          :style="{ color: sidebarStyles.textMuted }"
          :title="$t(group.title)"
        >
          {{ $t(group.title) }}
        </h2>
        <div v-show="!showText" class="h-px w-8 mx-auto mb-4" :style="{ backgroundColor: sidebarStyles.border }"></div>
        
        <div class="space-y-1">
          <div v-for="item in group.items" :key="item.label" class="relative group/parent">
            <!-- Parent Item (Link or Toggle) -->
            <NuxtLink 
              v-if="!item.children"
              :to="group.prefix + (item.path || '/')"
              class="w-full flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group relative hover-item"
              :class="[
                isCollapsed ? 'justify-center' : 'justify-between'
              ]"
              :style="getItemStyle(group.prefix + (item.path || '/'))"
            >
              <div class="flex items-center gap-3.5">
                <span v-if="item.icon" class="material-symbols-outlined text-[20px] transition-colors shrink-0" 
                  :style="{ color: isPathActive(group.prefix + (item.path || '/')) ? sidebarStyles.activeText : sidebarStyles.textMuted }"
                >
                  {{ item.icon }}
                </span>
                <span v-show="showText" class="text-[0.9rem] truncate max-w-[190px]" :title="$t(item.label)">{{ $t(item.label) }}</span>
              </div>
            </NuxtLink>

            <button 
              v-else
              @click="!isCollapsed ? toggleGroup(item.label) : null"
              class="w-full flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group hover-item"
              :class="[
                isCollapsed ? 'justify-center' : 'justify-between'
              ]"
              :style="getGroupHeaderStyle(item.label)"
            >
              <div class="flex items-center gap-3.5">
                <span v-if="item.icon" class="material-symbols-outlined text-[20px] transition-colors shrink-0" 
                  :style="{ color: openGroups.includes(item.label) ? sidebarStyles.activeText : sidebarStyles.textMuted }"
                >
                  {{ item.icon }}
                </span>
                <span v-show="showText" class="text-[0.9rem] truncate max-w-[180px]" :title="$t(item.label)">{{ $t(item.label) }}</span>
              </div>
              <span v-if="showText" class="material-symbols-outlined text-[18px] transition-transform duration-300" :class="{ 'rotate-180': openGroups.includes(item.label) }" :style="{ color: openGroups.includes(item.label) ? sidebarStyles.activeText : sidebarStyles.textMuted }">
                expand_more
              </span>
            </button>

            <!-- Tooltip for Collapsed State -->
            <div v-if="isCollapsed" class="absolute left-full ml-4 px-3 py-2 text-white text-xs font-medium rounded-lg shadow-md opacity-0 group-hover/parent:opacity-100 pointer-events-none transition-all duration-200 translate-x-[-4px] group-hover/parent:translate-x-0 z-[110] whitespace-nowrap" :style="{ backgroundColor: sidebarStyles.activeBg }">
              {{ $t(item.label) }}
              <div class="absolute left-[-4px] top-1/2 -translate-y-1/2 border-[4px] border-transparent" :style="{ borderRightColor: sidebarStyles.activeBg }"></div>
            </div>

            <!-- Children Submenu -->
            <div v-if="item.children && showText" v-show="openGroups.includes(item.label)" class="mt-1 ml-6 pl-5 border-l space-y-1 overflow-hidden transition-all" :style="{ borderColor: sidebarStyles.border }">
              <NuxtLink 
                v-for="child in item.children" 
                :key="child.label"
                :to="group.prefix + (child.path)"
                class="flex items-center gap-3 py-2 rounded-lg text-[0.85rem] transition-all group/child hover-item px-3"
                :style="getChildStyle(group.prefix + child.path)"
              >
                <div class="w-1.5 h-1.5 rounded-full transition-colors" :style="{ backgroundColor: isPathActive(group.prefix + child.path) ? sidebarStyles.activeBg : sidebarStyles.textMuted }"></div>
                <span class="truncate max-w-[170px]" :title="$t(child.label)">{{ $t(child.label) }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '~/stores/app'
import { useRoute } from 'vue-router'

const sidebarStyles = {
  bg: '#1e293b',
  border: '#334155',
  textMain: '#cbd5e1',
  textMuted: '#94a3b8',
  activeBg: '#3b82f6',
  activeText: '#ffffff',
  hoverBg: 'rgba(51, 65, 85, 0.5)'
}

const appStore = useAppStore()
const route = useRoute()
const isCollapsed = ref(false)
const showText = ref(true)
const openGroups = ref([])

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  document.documentElement.style.setProperty('--sidebar-width', isCollapsed.value ? '70px' : '280px')
  showText.value = !isCollapsed.value
}

const isPathActive = (path) => route.path === path

const getItemStyle = (path) => {
  const isActive = isPathActive(path)
  return {
    backgroundColor: isActive ? sidebarStyles.activeBg : 'transparent',
    color: isActive ? sidebarStyles.activeText : sidebarStyles.textMain,
    fontWeight: isActive ? '500' : '400'
  }
}

const getGroupHeaderStyle = (label) => {
  const isOpen = openGroups.value.includes(label)
  return {
    color: isOpen ? sidebarStyles.activeText : sidebarStyles.textMain,
    backgroundColor: isOpen ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
    fontWeight: isOpen ? '500' : '400'
  }
}

const getChildStyle = (path) => {
  const isActive = isPathActive(path)
  return {
    color: isActive ? sidebarStyles.activeText : sidebarStyles.textMuted,
    backgroundColor: isActive ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
    fontWeight: isActive ? '500' : '400'
  }
}

onMounted(() => {
  document.documentElement.style.setProperty('--sidebar-width', '280px')
})

const toggleGroup = (label) => {
  const index = openGroups.value.indexOf(label)
  if (index === -1) {
    openGroups.value.push(label)
  } else {
    openGroups.value.splice(index, 1)
  }
}
</script>

<style scoped>
.sidebar-scroll {
  scrollbar-width: thin;
  scrollbar-color: #475569 transparent;
}
.sidebar-scroll::-webkit-scrollbar { width: 4px; }
.sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
.sidebar-scroll::-webkit-scrollbar-thumb { 
  background-color: transparent; 
  border-radius: 10px; 
}
aside:hover .sidebar-scroll::-webkit-scrollbar-thumb {
  background-color: #475569; 
}
.sidebar-scroll::-webkit-scrollbar-thumb:hover { 
  background-color: #64748b; 
}

/* Hover effects for nav items */
.hover-item:hover {
  background-color: rgba(51, 65, 85, 0.5) !important;
}
</style>
