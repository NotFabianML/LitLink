import { defineNuxtPlugin } from '#app'
import axios from 'axios'

export default defineNuxtPlugin(() => {
  const apiClient = axios.create({
    baseURL: useRuntimeConfig().public.apiBase,
    headers: { 'Content-Type': 'application/json' }
  })

  // Interceptor para añadir el Bearer token en cada petición
  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  return {
    provide: {
      api: apiClient   // ahora disponible como nuxtApp.$api
    }
  }
})
