<template>
  <div 
    @click="toggleLanguage"
    :class="[
      'flex items-center gap-2 cursor-pointer hover:bg-slate-100 select-none',
      compact ? 'px-2 py-1 bg-white rounded border border-gray-300 text-xs' : 'w-16 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-medium'
    ]"
  >
    <ClientOnly>
      <img :src="locale === 'vi' ? 'https://flagcdn.com/w20/vn.png' : 'https://flagcdn.com/w20/us.png'" class="w-4 h-3 object-cover rounded-[1px]" :alt="locale === 'vi' ? 'VN' : 'US'" />
      <span>{{ locale === 'vi' ? (compact ? 'Tiếng Việt' : 'VI') : (compact ? 'English' : 'EN') }}</span>
      <template #fallback>
        <div class="w-4 h-3 bg-slate-200 rounded-[1px]"></div>
        <span>...</span>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const props = defineProps({
  compact: {
    type: Boolean,
    default: false
  }
})

const { locale } = useI18n()

function toggleLanguage() {
  locale.value = locale.value === 'vi' ? 'en' : 'vi'
  localStorage.setItem('i18n_locale', locale.value)
}
</script>
