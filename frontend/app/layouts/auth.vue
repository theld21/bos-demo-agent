<template>
  <div>
    <UiLoadingFull v-if="isLoading" />
    <div v-else class="h-screen w-full flex bg-surface text-on-surface text-gray-900">
      <main class="flex-1 min-h-screen flex flex-col transition-all duration-300">
        <div class="w-full max-w-full flex-1 flex flex-col relative grid-area-main-slot">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth/index'
import UiLoadingFull from '~/components/ui/LoadingFull.vue'

const authStore = useAuthStore()
const router = useRouter()
const isLoading = ref(true)

onMounted(async () => {
  authStore.init()

  if (authStore.accessToken) {
    if (!authStore.isFetched) {
       await authStore.fetchUser()
    }
    
    if (authStore.isLoggedIn) {
      return router.push('/database')
    }
  } else {
    authStore.isFetched = true
  }
  
  isLoading.value = false
})
</script>