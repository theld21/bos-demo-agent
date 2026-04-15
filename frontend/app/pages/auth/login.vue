<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <!-- Main Card -->
    <div class="w-full max-w-[550px] bg-slate-50 rounded-2xl border shadow-2xl overflow-hidden">
      <!-- Header Section -->
      <div class="bg-slate-50 pt-8 pb-4 px-8 text-center">
        <!-- Logo -->
        <div class="mb-4">
          <h1 class="text-2xl font-bold text-blue-600">BOS</h1>
        </div>
        
        <!-- Welcome Text -->
        <p class="text-slate-800 text-base font-normal leading-relaxed">
          {{ $t('auth.login.welcome_message') }}
        </p>
      </div>

      <!-- Form Section -->
      <div class="px-8 pb-6">
        <a-form :model="form" @finish="handleLogin" layout="vertical" class="login-form">
          <!-- Email Field -->
          <a-form-item 
            :label="$t('auth.login.username_label')" 
            name="email"
            :rules="[{ required: true, message: $t('auth.login.username_required') }]">
            <a-input 
              v-model:value="form.email" 
              size="large"
              :placeholder="$t('auth.login.username_placeholder')"
              class="login-input"
            />
          </a-form-item>

          <!-- Password Field -->
          <a-form-item 
            :label="$t('auth.login.password_label')" 
            name="password"
            :rules="[{ required: true, message: $t('auth.login.password_required') }]">
            <a-input-password 
              v-model:value="form.password" 
              size="large"
              :placeholder="$t('auth.login.password_placeholder')"
              class="login-input"
            />
          </a-form-item>

          <!-- Submit Button -->
          <a-form-item class="mb-0">
            <a-button 
              type="primary" 
              html-type="submit" 
              size="large"
              :loading="isLoading"
              class="login-button"
            >
              {{ isLoading ? $t('auth.login.submitting') : $t('auth.login.submit') }}
            </a-button>
          </a-form-item>
        </a-form>

        <!-- Error Alert -->
        <a-alert 
          v-if="error" 
          :message="error" 
          type="error" 
          show-icon 
          class="mt-4"
          closable
          @close="error = ''"
        />
      </div>

      <!-- Footer -->
      <div class="bg-slate-50 px-8 py-4 flex items-center justify-between border-t border-gray-200">
        <div class="flex items-center gap-4 text-sm text-slate-500">
          <span>Copyright © BOS</span>
          <span>Hotline: 19001688</span>
        </div>
        
        <!-- Language Switcher -->
        <div 
          @click="toggleLanguage"
          class="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-300 text-xs font-medium cursor-pointer hover:bg-slate-50 select-none"
        >
          <img 
            :src="locale === 'vi' ? 'https://flagcdn.com/w20/vn.png' : 'https://flagcdn.com/w20/us.png'" 
            class="w-4 h-3 object-cover rounded-[1px]" 
            :alt="locale === 'vi' ? 'VN' : 'US'" 
          />
          <span>{{ locale === 'vi' ? 'Tiếng Việt' : 'English' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useI18n } from 'vue-i18n'

const { locale, setLocale } = useI18n()

definePageMeta({
  layout: 'auth',
  path: '/login'
})

const router = useRouter()
const authStore = useAuthStore()

const isLoading = ref(false)
const error = ref('')

const form = ref({
  email: '',
  password: ''
})

const toggleLanguage = () => {
  locale.value = locale.value === 'vi' ? 'en' : 'vi'
}

const handleLogin = async () => {
  error.value = ''
  isLoading.value = true
  
  try {
    const payload = {
      email: form.value.email,
      password: form.value.password,
      remember_me: false
    }
    
    await authStore.login(payload)
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.message || err.response?.data?.error?.message || 'Invalid credentials.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-form :deep(.ant-form-item-label > label) {
  font-weight: 500;
  color: #374151;
}

.login-form :deep(.ant-form-item-label > label::after) {
  content: ' *';
  color: #ff4d4f;
}

.login-input :deep(.ant-input),
.login-input :deep(.ant-input-affix-wrapper) {
  border-radius: 8px;
}

.login-input :deep(.ant-input:hover),
.login-input :deep(.ant-input:focus),
.login-input :deep(.ant-input-affix-wrapper:hover),
.login-input :deep(.ant-input-affix-wrapper-focused) {
  border-color: #1677ff;
}

.login-button {
  width: 100%;
  border-radius: 8px;
  font-weight: 500;
  height: 44px;
}
</style>