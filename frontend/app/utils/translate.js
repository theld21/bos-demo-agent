export const $t = (key, ...args) => {
  const nuxtApp = useNuxtApp()
  if (!nuxtApp || !nuxtApp.$i18n) return key;
  return nuxtApp.$i18n.global.t(key, ...args)
}
