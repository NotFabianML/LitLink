// plugins/books.ts
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

  const booksService = {
    // GET /api/v1/books/search?q=...
    search(query: string) {
      return client.get('/books/search', { params: { q: query } })
    },
    // GET /api/v1/books/saved
    saved() {
      return client.get('/books/saved')
    },
    // nuevo método recommend que recibe tus preferencias
    recommend(preferences: {
      likedBooks?: string[]
      genres?: string[]
      authors?: string[]
    }) {
      return client.get('/books/search', {
        params: {
          q: Array
            .from(new Set([
              ...(preferences.likedBooks?.map(b => `title:"${b}"`) || []),
              ...(preferences.authors?.map(a => `author:"${a}"`) || []),
              ...(preferences.genres?.map(g => `subject:"${g}"`) || [])
            ]))
            .join(' OR ')
        }
      })
    }
  }

  nuxtApp.provide('books', booksService)
})
