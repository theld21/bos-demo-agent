import { ref } from 'vue'

export function createState() {
  const user = ref(null)
  const accessToken = ref(null)
  const isLoggedIn = ref(false)
  const isFetched = ref(false)

  return {
    user,
    accessToken,
    isLoggedIn,
    isFetched
  }
}
