<template>
  <div class="min-h-screen bg-neutral-50 pt-4 pb-20 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden" v-motion :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }">
        <img :src="book.cover" :alt="book.title" class="w-full h-64 object-cover" />
        <div class="p-6">
          <div class="flex items-start justify-between">
            <div>
              <h1 class="text-2xl font-bold">{{ book.title }}</h1>
              <p class="text-neutral-600">{{ book.author }}</p>
            </div>
            <span class="inline-block bg-neutral-100 rounded-full px-3 py-1 text-sm font-semibold text-neutral-700">
              {{ book.genre }}
            </span>
          </div>

          <div class="mt-6">
            <h2 class="text-lg font-semibold mb-2">Synopsis</h2>
            <p class="text-neutral-600">{{ book.synopsis }}</p>
          </div>

          <div class="mt-6">
            <h2 class="text-lg font-semibold mb-2">Details</h2>
            <dl class="grid grid-cols-2 gap-4">
              <div>
                <dt class="text-sm text-neutral-500">Published</dt>
                <dd class="text-neutral-900">{{ book.published }}</dd>
              </div>
              <div>
                <dt class="text-sm text-neutral-500">Pages</dt>
                <dd class="text-neutral-900">{{ book.pages }}</dd>
              </div>
              <div>
                <dt class="text-sm text-neutral-500">Rating</dt>
                <dd class="text-neutral-900">⭐️ {{ book.rating }}/5</dd>
              </div>
              <div>
                <dt class="text-sm text-neutral-500">ISBN</dt>
                <dd class="text-neutral-900">{{ book.isbn }}</dd>
              </div>
            </dl>
          </div>

          <div class="flex gap-4 mt-8">
            <a :href="book.buyLink" target="_blank"
              class="flex-1 bg-primary hover:bg-primary-dark text-neutral-900 font-semibold py-3 px-6 rounded-lg text-center transition-colors">
              Buy on Amazon
            </a>
            <a :href="book.goodreadsLink" target="_blank"
              class="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-medium py-3 px-6 rounded-lg text-center transition-colors">
              View on Goodreads
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const book = ref({
  id: route.params.id,
  title: "The Midnight Library",
  author: "Matt Haig",
  genre: "Fiction",
  cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3",
  synopsis: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
  published: "2020",
  pages: 304,
  rating: 4.2,
  isbn: "9780525559474",
  buyLink: "https://www.amazon.com/Midnight-Library-Matt-Haig/dp/0525559477",
  goodreadsLink: "https://www.goodreads.com/book/show/52578297-the-midnight-library"
})
</script>