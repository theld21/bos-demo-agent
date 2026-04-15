import { useNuxtApp, useCookie } from '#app'

export function createActions(state) {
  const init = () => {
    const token = useCookie('access_token', { path: '/' }).value
    state.accessToken.value = token || null
  }

  const fetchUser = async () => {
    const nuxtApp = useNuxtApp()
    if (!state.accessToken.value) {
      state.isFetched.value = true
      return false
    }

    try {
      const { data } = await nuxtApp.$api.get('/api/auth/me')
      state.user.value = data.user || data
      state.isLoggedIn.value = true
      state.isFetched.value = true
      return true
    } catch (error) {
      if (error.response && error.response.status === 401) {
        _performLogout(nuxtApp)
      }
      state.isFetched.value = true
      return false
    }
  }

  const login = async (credentials) => {
    const nuxtApp = useNuxtApp()
    const { data } = await nuxtApp.$api.post('/api/auth/login', credentials)

    state.accessToken.value = data.access_token
    state.user.value = data.user
    state.isLoggedIn.value = true
    state.isFetched.value = true

    _setCookies(nuxtApp, data.access_token, data.refresh_token, credentials.remember_me)
    return data
  }

  const logout = async () => {
    const nuxtApp = useNuxtApp()
    try {
      await nuxtApp.$api.post('/api/auth/logout')
    } catch (error) {
      console.error('Logout API error:', error)
    }
    _performLogout(nuxtApp)
  }

  const _performLogout = (nuxtApp) => {
    state.accessToken.value = null
    state.user.value = null
    state.isLoggedIn.value = false
    _setCookies(nuxtApp, null, null)

    // Always redirect to login on perform logout to centralize flow
    nuxtApp.runWithContext(() => navigateTo('/login'))
  }

  const _setCookies = (nuxtApp, access, refresh, rememberMe = false) => {
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

  return {
    init,
    fetchUser,
    login,
    logout
  }
}
