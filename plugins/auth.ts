import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const client = axios.create({
    baseURL: config.public.apiBase,
    headers: { 'Content-Type': 'application/json' }
  })

  client.interceptors.request.use(req => {
    const token = localStorage.getItem('token')
    if (token && req.headers) req.headers.Authorization = `Bearer ${token}`
    return req
  })

  const authService = {
    signup(data: { first_name: string; last_name: string; email: string; password: string }) {
      return client.post('/auth/signup', { auth: { user: data } })
    },
    login(data: { email: string; password: string }) {
      return client.post('/auth/login', data)
    }
  }

  nuxtApp.provide('auth', authService)
})

