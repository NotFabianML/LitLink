import apiClient from '~/plugins/axios' // Asegúrate de que la ruta sea correcta
import type { LoginPayload, SignupPayload } from '~/plugins/types' // Asegúrate de que la ruta sea correcta

const api = useNuxtApp().$api

export default {
  async signup(data: SignupPayload) {
    const response = await api.post('/auth/signup', { auth: { user: data } })
    return response.data
  },
  async login(data: LoginPayload) {
    const response = await api.post('/auth/login', data)
    return response.data
  },
  async me(token: string) {
    const response = await api.get('/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  }
}
