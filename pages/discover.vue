<template>
  <div class="min-h-screen bg-neutral-50 pt-4 pb-20 px-4">
    <div class="max-w-md mx-auto relative h-[calc(100vh-8rem)]">
      <div v-for="(book, index) in books" :key="book.id" class="absolute w-full" :style="{
        zIndex: books.length - index,
        transform: `scale(${1 - index * 0.05})`
      }">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden" v-touch:swipe="handleSwipe">
          <img :src="book.cover" :alt="book.title" class="w-full h-64 object-cover" />
          <div class="p-6">
            <h3 class="text-xl font-bold">{{ book.title }}</h3>
            <p class="text-neutral-600">{{ book.author }}</p>
            <span
              class="inline-block bg-neutral-100 rounded-full px-3 py-1 text-sm font-semibold text-neutral-700 mt-2">
              {{ book.genre }}
            </span>
            <button @click="showDetails(book)"
              class="mt-4 w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-medium py-2 px-4 rounded-lg transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>

      <div class="fixed bottom-20 left-0 right-0 flex justify-center gap-4 px-4">
        <button @click="handleReject"
          class="bg-white hover:bg-neutral-100 w-16 h-16 rounded-full shadow-lg flex items-center justify-center">
          ❌
        </button>
        <button @click="handleAccept"
          class="bg-white hover:bg-neutral-100 w-16 h-16 rounded-full shadow-lg flex items-center justify-center">
          ✅
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const books = ref([
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3",
  },
  {
    id: 2,
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Sci-Fi",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3",
  },
  // Add more books here
])

const handleSwipe = (direction) => {
  if (direction === 'left') handleReject()
  if (direction === 'right') handleAccept()
}

const handleAccept = () => {
  if (books.value.length) {
    // Save to reading list
    books.value.shift()
  }
}

const handleReject = () => {
  if (books.value.length) {
    books.value.shift()
  }
}

const showDetails = (book) => {
  navigateTo(`/book/${book.id}`)
}
</script>