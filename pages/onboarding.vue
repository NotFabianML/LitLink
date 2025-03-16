<template>
  <section class="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <h2 class="text-2xl font-bold text-center mb-8">Let's get to know you</h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-neutral-700">
            Favorite Genres
          </label>
          <div class="mt-2 grid grid-cols-2 gap-2">
            <button v-for="genre in genres" :key="genre" type="button" :class="[
              'px-4 py-2 rounded-lg text-sm font-medium',
              selectedGenres.includes(genre)
                ? 'bg-primary text-neutral-900'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            ]" @click="toggleGenre(genre)">
              {{ genre }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-neutral-700">
            Recently Read Books
          </label>
          <input type="text" v-model="recentBook"
            class="mt-1 block w-full rounded-lg border-neutral-300 shadow-sm focus:border-primary focus:ring-primary"
            placeholder="Enter a book title" />
        </div>

        <div>
          <label class="block text-sm font-medium text-neutral-700">
            Preferred Format
          </label>
          <select v-model="preferredFormat"
            class="mt-1 block w-full rounded-lg border-neutral-300 shadow-sm focus:border-primary focus:ring-primary">
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
  </section>
</template>

<script setup>
import { ref } from 'vue'

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

const selectedGenres = ref([])
const recentBook = ref('')
const preferredFormat = ref('physical')

const toggleGenre = (genre) => {
  if (selectedGenres.value.includes(genre)) {
    selectedGenres.value = selectedGenres.value.filter((g) => g !== genre)
  } else {
    selectedGenres.value.push(genre)
  }
}

const handleSubmit = () => {
  // Save preferences and redirect to discover page
  navigateTo('/discover')
}
</script>
