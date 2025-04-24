import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import axios from 'axios'

import type { PreferencePayload } from './types' // Asegúrate de que la ruta sea correcta

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

  interface PrefService {
    get: () => Promise<any>;
    create: (payload: PreferencePayload) => Promise<any>;
    update: (payload: PreferencePayload) => Promise<any>;
    remove: () => Promise<any>;
  }

  const prefService: PrefService = {
    get: () => client.get('/preference'),
    create: (payload: PreferencePayload) => client.post('/preference', payload),
    update: (payload: PreferencePayload) => client.patch('/preference', payload),
    remove: () => client.delete('/preference'),
  }

  nuxtApp.provide('pref', prefService)
})

