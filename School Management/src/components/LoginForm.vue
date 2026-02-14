<script setup>
import { reactive } from 'vue'
import { useAppStore } from '../stores/app.js'

const form = reactive({
  username: '',
  password: '',
})
const store = useAppStore()

async function onSubmit(e) {
  e.preventDefault()
  await store.login(form.username, form.password).catch(() => {})
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="w-full max-w-md space-y-6">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900">Sign in</h1>
        <p class="mt-1 text-sm text-gray-600">Enter your credentials to continue</p>
      </div>

      <form @submit="onSubmit" class="bg-white shadow rounded-lg p-6 space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            id="username"
            type="text"
            v-model="form.username"
            required
            autocomplete="username"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="yourusername"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            v-model="form.password"
            required
            autocomplete="current-password"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="store.loading"
          class="w-full inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="store.loading" class="animate-pulse">Signing in…</span>
          <span v-else>Sign in</span>
        </button>

        <p v-if="store.error" class="text-sm text-red-600">{{ store.error }}</p>
        <p v-if="store.user" class="text-sm text-green-600">Signed in successfully</p>
      </form>
    </div>
  </div>
  </template>

<style scoped>
</style>
