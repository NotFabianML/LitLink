// middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo, useNuxtApp } from '#app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
  if (!auth.loaded) await auth.init()

  // rutas públicas
  const publicPages = ['/', '/login', '/signup']
  if (publicPages.includes(to.path)) return

  // 1. No autenticado → /login
  if (!auth.isAuthenticated) {
    return navigateTo('/login')
  }

  // 2. Autenticado sin prefs → /onboarding
  if (!auth.user?.preferencesSelected && to.path !== '/onboarding') {
    return navigateTo('/onboarding')
  }

  // 3. Autenticado con prefs y en onboarding → /discover
  if (auth.user?.preferencesSelected && to.path === '/onboarding') {
    return navigateTo('/discover')
  }
})
