// plugins/bookActions.ts
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const client = axios.create({
    baseURL: config.public.apiBase,
    headers: { 'Content-Type': 'application/json' }
  })

  // Adjunta siempre el token
  client.interceptors.request.use(req => {
    const token = localStorage.getItem('token')
    if (token && req.headers) req.headers.Authorization = `Bearer ${token}`
    return req
  })

  const bookActionsService = {
    // GET    /api/v1/book_actions
    getAll() {
      return client.get('/book_actions')
    },
    // GET    /api/v1/book_actions/:id
    get(id: string) {
      return client.get(`/book_actions/${id}`)
    },
    // POST   /api/v1/book_actions
    create(payload: { book_id: string; swipe_action: 'left' | 'right'; status?: string }) {
      return client.post('/book_actions', payload)
    },
    // PATCH  /api/v1/book_actions/:id
    update(id: string, payload: { swipe_action?: string; status?: string }) {
      return client.patch(`/book_actions/${id}`, payload)
    },
    // DELETE /api/v1/book_actions/:id
    remove(id: string) {
      return client.delete(`/book_actions/${id}`)
    }
  }

  nuxtApp.provide('bookActions', bookActionsService)
})
