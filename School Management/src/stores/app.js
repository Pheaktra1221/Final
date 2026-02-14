import { defineStore } from 'pinia'
import { loginByUsername } from '../api/client.js'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: null,
    loading: false,
    error: '',
  }),
  actions: {
    async login(username, password) {
      this.loading = true
      this.error = ''
      try {
        const res = await loginByUsername({ username, password })
        this.user = res.user || null
        return this.user
      } catch (e) {
        this.error = e?.message || 'Login failed'
        throw e
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.user = null
    },
  },
})
