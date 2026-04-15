import { ref } from 'vue'

export function createState() {
  const isMainLoading = ref(false)

  return {
    isMainLoading
  }
}
