<template>
  <div class="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto">
      <div class="bg-white rounded-2xl shadow-xl p-8" v-motion :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }">
        <h2 class="text-2xl font-bold text-center mb-8">Let's get to know you</h2>

        <form @submit.prevent="handleSubmit" class="space-y-8">
          <div>
            <label class="block text-lg font-medium text-neutral-700 mb-3">
              Favorite Genres
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button v-for="genre in genres" :key="genre" type="button" :class="[
                'px-4 py-2 rounded-lg text-sm font-medium',
                preferences.genres.includes(genre)
                  ? 'bg-primary text-neutral-900'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              ]" @click="toggleGenre(genre)">
                {{ genre }}
              </button>
            </div>
          </div>

          <div>
            <label class="block text-lg font-medium text-neutral-700 mb-3">
              Favorite Books
            </label>
            <div class="space-y-2">
              <div v-for="(book, index) in preferences.favoriteBooks" :key="index" class="flex gap-2">
                <input type="text" v-model="preferences.favoriteBooks[index]"
                  class="flex-1 rounded-lg border-neutral-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter a book title" />
                <button type="button" @click="removeBook(index)" class="text-neutral-500 hover:text-neutral-700">
                  ✕
                </button>
              </div>
              <button type="button" @click="addBook" class="text-sm text-neutral-600 hover:text-neutral-900">
                + Add another book
              </button>
            </div>
          </div>

          <div>
            <label class="block text-lg font-medium text-neutral-700 mb-3">
              Favorite Authors
            </label>
            <div class="space-y-2">
              <div v-for="(author, index) in preferences.favoriteAuthors" :key="index" class="flex gap-2">
                <input type="text" v-model="preferences.favoriteAuthors[index]"
                  class="flex-1 rounded-lg border-neutral-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter an author name" />
                <button type="button" @click="removeAuthor(index)" class="text-neutral-500 hover:text-neutral-700">
                  ✕
                </button>
              </div>
              <button type="button" @click="addAuthor" class="text-sm text-neutral-600 hover:text-neutral-900">
                + Add another author
              </button>
            </div>
          </div>

          <div>
            <label class="block text-lg font-medium text-neutral-700 mb-3">
              Preferred Format
            </label>
            <select v-model="preferences.preferredFormat"
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
</template>

<script setup>
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

const preferences = ref({
  genres: [],
  favoriteBooks: [''],
  favoriteAuthors: [''],
  preferredFormat: 'physical'
})

const toggleGenre = (genre) => {
  if (preferences.value.genres.includes(genre)) {
    preferences.value.genres = preferences.value.genres.filter(g => g !== genre)
  } else {
    preferences.value.genres.push(genre)
  }
}

const addBook = () => {
  preferences.value.favoriteBooks.push('')
}

const removeBook = (index) => {
  preferences.value.favoriteBooks.splice(index, 1)
}

const addAuthor = () => {
  preferences.value.favoriteAuthors.push('')
}

const removeAuthor = (index) => {
  preferences.value.favoriteAuthors.splice(index, 1)
}

const handleSubmit = () => {
  // Save preferences and redirect to discover page
  console.log('Initial preferences:', preferences.value)
  navigateTo('/discover')
}
</script>