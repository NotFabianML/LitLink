// plugins/user.ts
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const client = axios.create({
    baseURL: config.public.apiBase,
    headers: { 'Content-Type': 'application/json' }
  })

  // Interceptor para adjuntar token
  client.interceptors.request.use((req) => {
    const token = localStorage.getItem('token')
    if (token && req.headers) {
      req.headers.Authorization = `Bearer ${token}`
    }
    return req
  })

  const userService = {
    getById(userId: string) {
      return client.get(`/users/${userId}`)
    },
    update(userId: string, payload: any) {
      return client.patch(`/users/${userId}`, payload)
    },
    delete(userId: string) {
      return client.delete(`/users/${userId}`)
    }
  }

  nuxtApp.provide('user', userService)
})
