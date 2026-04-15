export function createActions(state) {
  const setMainLoading = (v) => {
    state.isMainLoading.value = v
  }

  return {
    setMainLoading
  }
}
