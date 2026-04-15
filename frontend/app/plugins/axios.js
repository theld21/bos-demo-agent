import axios from 'axios'
import { useCookie, useRuntimeConfig, navigateTo, useRouter } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const router = useRouter()
  const defaultUrl = config.public.apiBase
  
  // Access cookie refs in plugin body (Nuxt context available) 
  const accessToken = useCookie('access_token', { path: '/' })
  const refreshToken = useCookie('refresh_token', { path: '/' })

  const api = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {
        Accept: 'application/json'
      }
    }
  })

  api.interceptors.request.use((config) => {
    if (accessToken.value) {
      config.headers.Authorization = `Bearer ${accessToken.value}`
    }
    return config
  })

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        accessToken.value = null
        refreshToken.value = null
        
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      api: api
    }
  }
})
