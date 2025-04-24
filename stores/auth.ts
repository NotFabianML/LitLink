import { defineStore } from "pinia"
import { useNuxtApp, navigateTo } from "#app"

interface SignupPayload { first_name: string; last_name: string; email: string; password: string }
interface LoginPayload { email: string; password: string }

interface Preferences {
  favorite_genres: string[]
  favorite_authors: string[]
  favorite_books: string[]
  preferred_format: string
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "" as string,
    user: null as null | {
      id: string
      first_name: string
      last_name: string
      email: string
      preferencesSelected: boolean
    },
    preferences: null as null | Preferences,
    loaded: false as boolean,
  }),
  getters: {
    isAuthenticated: s => Boolean(s.token),
    hasPreferences: s => Boolean(s.preferences?.favorite_genres?.length),
  },
  actions: {
    async init() {
      const saved = localStorage.getItem("token")
      if (saved) {
        this.token = saved
      }
      this.loaded = true
    },

    async signup(p: SignupPayload) {
      const nuxt = useNuxtApp()
      const { data } = await nuxt.$auth.signup(p)
      this.token = data.token
      this.user = {
        ...data.user,
        preferencesSelected: false
      }
      localStorage.setItem("token", this.token)
      await this.loadPreferences()
    },

    async login(p: LoginPayload) {
      const nuxt = useNuxtApp()
      const { data } = await nuxt.$auth.login(p)
      this.token = data.token
      this.user = {
        ...data.user,
        preferencesSelected: false
      }
      localStorage.setItem("token", this.token)
      await this.loadPreferences()
    },

    logout() {
      this.token = ""
      this.user = null
      this.preferences = null
      localStorage.removeItem("token")
      return navigateTo("/login")
    },

    async loadPreferences() {
      if (!this.token) {
        this.preferences = null
        return
      }
      const nuxt = useNuxtApp()
      try {
        const { data } = await nuxt.$pref.get()
        this.preferences = data
        this.user!.preferencesSelected = true
      } catch {
        this.preferences = null
      }
    },
  }
})
