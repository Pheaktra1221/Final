<script setup>
import { useAppStore } from '../stores/app.js'
const store = useAppStore()
</script>

<template>
  <div class="min-h-screen bg-white p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="mt-2 text-gray-700">Welcome, {{ store.user?.username || store.user?.email }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
