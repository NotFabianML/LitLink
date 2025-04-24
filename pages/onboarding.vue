<template>
  <ClientOnly>
    <div class="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md mx-auto">
        <div class="bg-white rounded-2xl shadow-xl p-8" v-motion :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }">
          <h2 class="text-2xl font-bold text-center mb-8">Let's get to know you</h2>

          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- 1) Favorite Genres -->
            <div>
              <label class="block text-lg font-medium text-neutral-700 mb-3">
                Favorite Genres
              </label>
              <div class="grid grid-cols-2 gap-2">
                <button v-for="genre in genres" :key="genre" type="button" :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium',
                  localPrefs.favorite_genres.includes(genre)
                    ? 'bg-primary text-neutral-900'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                ]" @click="toggleGenre(genre)">
                  {{ genre }}
                </button>
              </div>
            </div>

            <!-- 2) Favorite Books -->
            <div>
              <label class="block text-lg font-medium text-neutral-700 mb-3">
                Favorite Books
              </label>
              <div class="space-y-2">
                <div v-for="(book, i) in localPrefs.favorite_books" :key="i" class="flex gap-2">
                  <input type="text" v-model="localPrefs.favorite_books[i]"
                    class="flex-1 rounded-lg border-neutral-300 shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="Enter a book title" />
                  <button type="button" @click="removeBook(i)" class="text-neutral-500 hover:text-neutral-700">
                    ✕
                  </button>
                </div>
                <button type="button" @click="addBook" class="text-sm text-neutral-600 hover:text-neutral-900">
                  + Add another book
                </button>
              </div>
            </div>

            <!-- 3) Favorite Authors -->
            <div>
              <label class="block text-lg font-medium text-neutral-700 mb-3">
                Favorite Authors
              </label>
              <div class="space-y-2">
                <div v-for="(author, i) in localPrefs.favorite_authors" :key="i" class="flex gap-2">
                  <input type="text" v-model="localPrefs.favorite_authors[i]"
                    class="flex-1 rounded-lg border-neutral-300 shadow-sm focus:border-primary focus:ring-primary"
                    placeholder="Enter an author name" />
                  <button type="button" @click="removeAuthor(i)" class="text-neutral-500 hover:text-neutral-700">
                    ✕
                  </button>
                </div>
                <button type="button" @click="addAuthor" class="text-sm text-neutral-600 hover:text-neutral-900">
                  + Add another author
                </button>
              </div>
            </div>

            <!-- 4) Preferred Format -->
            <div>
              <label class="block text-lg font-medium text-neutral-700 mb-3">
                Preferred Format
              </label>
              <select v-model="localPrefs.preferred_format"
                class="w-full rounded-lg border-neutral-300 shadow-sm focus:border-primary focus:ring-primary">
                <option value="physical">Physical Books</option>
                <option value="ebook">E-books</option>
                <option value="audio">Audiobooks</option>
              </select>
            </div>

            <button type="submit"
              class="w-full bg-primary hover:bg-primary-dark text-neutral-900 font-semibold py-3 px-6 rounded-lg transition-colors">
              Continue
            </button>

          </form>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useNuxtApp } from '#app'

const genres = [
  'Fiction',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Fantasy',
  'Biography',
  'History',
  'Self-Help'
]

const auth = useAuthStore()
const nuxt = useNuxtApp()

// estado local sincronizado con la store
const localPrefs = reactive({
  favorite_genres: [] as string[],
  favorite_books: [] as string[],
  favorite_authors: [] as string[],
  preferred_format: 'physical'
})

onMounted(() => {
  if (auth.preferences) {
    // precarga para edición
    Object.assign(localPrefs, {
      favorite_genres: [...auth.preferences.favorite_genres],
      favorite_books: [...auth.preferences.favorite_books],
      favorite_authors: [...auth.preferences.favorite_authors],
      preferred_format: auth.preferences.preferred_format || 'physical'
    })
  } else {
    // inicia con un campo vacío
    localPrefs.favorite_books = ['']
    localPrefs.favorite_authors = ['']
  }
})

function toggleGenre(g: string) {
  const idx = localPrefs.favorite_genres.indexOf(g)
  if (idx >= 0) localPrefs.favorite_genres.splice(idx, 1)
  else localPrefs.favorite_genres.push(g)
}
function addBook() { localPrefs.favorite_books.push('') }
function removeBook(i: number) { localPrefs.favorite_books.splice(i, 1) }
function addAuthor() { localPrefs.favorite_authors.push('') }
function removeAuthor(i: number) { localPrefs.favorite_authors.splice(i, 1) }

async function handleSubmit() {
  try {
    await nuxt.$pref.create({
      favorite_genres: localPrefs.favorite_genres,
      favorite_books: localPrefs.favorite_books,
      favorite_authors: localPrefs.favorite_authors,
      preferred_format: localPrefs.preferred_format
    })
    await auth.loadPreferences()
    navigateTo('/discover')
  } catch (err) {
    console.error('Error saving prefs', err)
    alert('No se pudieron guardar tus preferencias.')
  }
}

// opcional: limpiar todas las preferencias
async function resetPrefs() {
  await nuxt.$pref.remove()
  auth.preferences = null
  Object.assign(localPrefs, {
    favorite_genres: [],
    favorite_books: [''],
    favorite_authors: [''],
    preferred_format: 'physical'
  })
}
</script>
