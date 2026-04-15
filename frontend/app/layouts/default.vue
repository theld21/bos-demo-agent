<template>
  <div>
    <UiLoadingFull v-if="isLoading" />
    <div v-else-if="authStore.isLoggedIn" class="h-screen w-full flex flex-col bg-slate-100">
      <AppHeader />
      <main class="flex-1 overflow-auto bg-slate-50 pt-20">
        <div class="max-w-screen-6xl mx-auto xs:px-3 3lg:px-6">
          <slot />
        </div>
        <UiLoadingOverlay />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth/index'
import AppHeader from '~/components/layout/AppHeader.vue'
import UiLoadingOverlay from '~/components/ui/LoadingOverlay.vue'
import UiLoadingFull from '~/components/ui/LoadingFull.vue'

const authStore = useAuthStore()
const router = useRouter()
const isLoading = ref(true)

onMounted(async () => {
  authStore.init()

  if (!authStore.accessToken) {
    authStore.isFetched = true
    return router.push('/login')
  }

  if (!authStore.isFetched) {
    const success = await authStore.fetchUser()
    if (!success) {
      return router.push('/login')
    }
  } else if (!authStore.isLoggedIn) {
     return router.push('/login')
  }

  isLoading.value = false
})
</script>
