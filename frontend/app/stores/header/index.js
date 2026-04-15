import { defineStore } from 'pinia'
import { createState } from './state'
import { createGetters } from './getters'
import { createActions } from './actions'

export const useHeaderStore = defineStore('header', () => {
  const state = createState()
  const getters = createGetters(state)
  const actions = createActions(state)

  return {
    ...state,
    ...getters,
    ...actions
  }
})
