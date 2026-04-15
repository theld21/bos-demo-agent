import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import vi from '../locales/vi.json'

export default defineNuxtPlugin((nuxtApp) => {
  let defaultLocale = 'vi'

  if (typeof window !== 'undefined') {
    const savedLocale = localStorage.getItem('i18n_locale')
    if (savedLocale && ['vi', 'en'].includes(savedLocale)) {
      defaultLocale = savedLocale
    }
  }

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: defaultLocale,
    fallbackLocale: 'vi',
    messages: {
      en,
      vi
    }
  })

  nuxtApp.vueApp.use(i18n)

  return {
    provide: {
      i18n
    }
  }
})
