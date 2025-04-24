<template>
  <ClientOnly>
    <div class="min-h-screen bg-neutral-50 pt-20 pb-20 px-4">
      <div class="max-w-md mx-auto">
        <div class="bg-white rounded-2xl shadow-xl p-8" v-motion :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }">
          <!-- Avatar y nombre -->
          <div class="flex items-center gap-4 mb-8">
            <img :src="profile.avatarUrl" alt="Profile" class="w-20 h-20 rounded-full object-cover" />
            <div>
              <h1 class="text-2xl font-bold">{{ profile.name }}</h1>
              <p class="text-neutral-600">Joined {{ profile.joinDate }}</p>
            </div>
          </div>

          <!-- Estadísticas -->
          <div class="grid grid-cols-2 gap-4 mb-8">
            <div class="bg-neutral-50 rounded-lg p-4 text-center">
              <span class="block text-2xl font-bold text-neutral-900">
                {{ profile.booksSaved }}
              </span>
              <span class="text-sm text-neutral-600">Books Saved</span>
            </div>
            <div class="bg-neutral-50 rounded-lg p-4 text-center">
              <span class="block text-2xl font-bold text-neutral-900">
                {{ profile.currentlyReading }}
              </span>
              <span class="text-sm text-neutral-600">Currently Reading</span>
            </div>
          </div>

          <!-- Preferencias de lectura -->
          <div class="mb-8">
            <h2 class="text-lg font-semibold mb-4">Reading Preferences</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">
                  Favorite Genres
                </label>
                <div class="flex flex-wrap gap-2">
                  <span v-for="genre in profile.genres" :key="genre"
                    class="bg-primary text-neutral-900 px-3 py-1 rounded-full text-sm font-medium">
                    {{ genre }}
                  </span>
                  <span v-if="!profile.genres.length" class="text-sm text-neutral-500">
                    — none —
                  </span>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">
                  Preferred Format
                </label>
                <p class="text-neutral-900">{{ profile.preferredFormat }}</p>
              </div>
            </div>
          </div>

          <!-- Enlaces para editar -->
          <div class="space-y-3">
            <NuxtLink to="/profile/edit"
              class="block w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-medium py-3 px-6 rounded-lg text-center transition-colors">
              Edit Profile
            </NuxtLink>
            <NuxtLink to="/profile/preferences"
              class="block w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-medium py-3 px-6 rounded-lg text-center transition-colors">
              Edit Reading Preferences
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Logout -->
      <button @click="handleLogout"
        class="mt-6 max-w-md mx-auto block w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
        Log Out
      </button>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useNuxtApp, navigateTo } from '#app'

interface Profile {
  avatarUrl: string
  name: string
  joinDate: string
  genres: string[]
  preferredFormat: string
  booksSaved: number
  currentlyReading: number
}

const auth = useAuthStore()
const nuxt = useNuxtApp()

const profile = ref < Profile > ({
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
  name: '',
  joinDate: '',
  genres: [],
  preferredFormat: '',
  booksSaved: 0,
  currentlyReading: 0
})

onMounted(async () => {
  // Si no está autenticado, redirige al login
  if (!auth.isAuthenticated || !auth.user) {
    return navigateTo('/login')
  }

  try {
    const { data: userData } = await nuxt.$user.getById(auth.user.id)
    profile.value.name = `${userData.first_name} ${userData.last_name}`
    if (userData.created_at) {
      const d = new Date(userData.created_at)
      profile.value.joinDate = d.toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric'
      })
    }

    if (auth.preferences) {
      profile.value.genres = auth.preferences.favorite_genres
      profile.value.preferredFormat = auth.preferences.preferred_format
    }

  } catch (err) {
    console.error('Error cargando perfil:', err)
  }
})

function handleLogout() {
  auth.logout()
}
</script>
