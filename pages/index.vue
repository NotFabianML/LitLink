<script setup>
import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore()
const handleStart = async () => {
  const auth = useAuthStore()
  await auth.init()

  if (!auth.isAuthenticated) {
    return navigateTo('/login')
  }
  if (!auth.hasPreferences) {
    return navigateTo('/onboarding')
  }
  return navigateTo('/discover')
}
</script>
<template>
  <div class="flex min-h-screen items-center justify-center bg-neutral-50">
    <div class="max-w-md w-full px-6 py-12 bg-white rounded-2xl shadow-xl" :initial="{ opacity: 0, y: 50 }"
      :enter="{ opacity: 1, y: 0 }">
      <h1 class="text-4xl font-bold text-center mb-8">
        Welcome to LitLink
      </h1>
      <p class="text-neutral-600 text-center mb-8">
        Discover your next favorite book through personalized recommendations
      </p>

      <button
        class="block w-full bg-primary hover:bg-primary-dark text-neutral-900 font-semibold py-3 px-6 rounded-lg text-center transition-colors"
        @click="handleStart">Get Started</button>
    </div>
  </div>
</template>