import { defineStore } from 'pinia'
import { useNuxtApp, useCookie } from '#app'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
    isLoggedIn: false,
    isFetched: false,
  }),
  actions: {
    init() {
      const token = useCookie('access_token', { path: '/' }).value
      this.accessToken = token || null
    },
    async fetchUser() {
      const nuxtApp = useNuxtApp()
      if (!this.accessToken) {
        this.isFetched = true
        return false
      }
      
      try {
        const { data } = await nuxtApp.$api.get('/api/auth/me')
        this.user = data.user || data
        this.isLoggedIn = true
        this.isFetched = true
        return true
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this._performLogout(nuxtApp)
        }
        this.isFetched = true
        return false
      }
    },
    async login(credentials) {
      const nuxtApp = useNuxtApp()
      const { data } = await nuxtApp.$api.post('/api/auth/login', credentials)
      
      this.accessToken = data.access_token
      this.user = data.user
      this.isLoggedIn = true
      this.isFetched = true
      
      this._setCookies(nuxtApp, data.access_token, data.refresh_token, credentials.remember_me)
      return data
    },
    async logout() {
      const nuxtApp = useNuxtApp()
      try {
        await nuxtApp.$api.post('/api/auth/logout')
      } catch (error) {
        console.error('Logout API error:', error)
      }
      this._performLogout(nuxtApp)
    },
    _performLogout(nuxtApp) {
      this.accessToken = null
      this.user = null
      this.isLoggedIn = false
      this._setCookies(nuxtApp, null, null)

      // Always redirect to login on perform logout to centralize flow
      nuxtApp.runWithContext(() => navigateTo('/login'))
    },
    _setCookies(nuxtApp, access, refresh, rememberMe = false) {
      nuxtApp.runWithContext(() => {
        const cookieOptions = { 
          path: '/',
          maxAge: rememberMe ? 30 * 24 * 60 * 60 : 3 * 24 * 60 * 60,
          sameSite: 'lax'
        }
        
        const accessCookie = useCookie('access_token', cookieOptions)
        const refreshCookie = useCookie('refresh_token', cookieOptions)
        
        accessCookie.value = access
        refreshCookie.value = refresh
      })
    }
  }
})