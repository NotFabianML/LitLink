<template>
  <div class="min-h-screen bg-neutral-50 pt-4 pb-20 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">Reading List</h1>
        <div class="flex gap-2">
          <select v-model="filter" class="rounded-lg border-neutral-300 text-sm">
            <option value="all">All Genres</option>
            <option v-for="genre in genres" :key="genre" :value="genre">
              {{ genre }}
            </option>
          </select>
          <button @click="exportList"
            class="bg-primary hover:bg-primary-dark text-neutral-900 px-4 py-2 rounded-lg text-sm font-medium">
            Export
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div v-for="book in filteredBooks" :key="book.id" class="bg-white rounded-lg shadow-md overflow-hidden" v-motion
          :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
          <img :src="book.cover" :alt="book.title" class="w-full h-40 object-cover" />
          <div class="p-4">
            <h3 class="font-semibold text-sm mb-1">{{ book.title }}</h3>
            <p class="text-neutral-600 text-xs">{{ book.author }}</p>
            <div class="flex items-center justify-between mt-2">
              <span class="text-xs bg-neutral-100 px-2 py-1 rounded-full">
                {{ book.genre }}
              </span>
              <button @click="toggleStatus(book)" :class="[
                'text-xs px-2 py-1 rounded-full',
                book.status === 'reading' ? 'bg-primary text-neutral-900' : 'bg-neutral-100'
              ]">
                {{ book.status }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const filter = ref('all')
const genres = ['Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Biography']

const books = ref([
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction",
    status: "reading",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3",
  },
  {
    id: 2,
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Sci-Fi",
    status: "want to read",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3",
  },
])

const filteredBooks = computed(() => {
  if (filter.value === 'all') return books.value
  return books.value.filter(book => book.genre === filter.value)
})

const toggleStatus = (book) => {
  book.status = book.status === 'reading' ? 'want to read' : 'reading'
}

const exportList = () => {
  const csv = books.value.map(book =>
    `${book.title},${book.author},${book.genre},${book.status}`
  ).join('\n')

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'reading-list.csv'
  a.click()
}
</script>