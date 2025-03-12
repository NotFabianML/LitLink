<template>
  <div class="min-h-screen bg-neutral-50 pt-4 pb-20 px-4">
    <div class="max-w-2xl mx-auto">
      <div v-if="book" class="bg-white rounded-2xl shadow-xl overflow-hidden" v-motion :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }">
        <img :src="book.coverUrl || placeholderImage" :alt="book.title" class="w-full h-64 object-cover" />
        <div class="p-6">
          <div class="flex items-start justify-between">
            <div>
              <h1 class="text-2xl font-bold">{{ book.title }}</h1>
              <p class="text-neutral-600">{{ book.authors.join(', ') }}</p>
            </div>
            <span v-if="book.categories?.length"
              class="inline-block bg-neutral-100 rounded-full px-3 py-1 text-sm font-semibold text-neutral-700">
              {{ book.categories[0] }}
            </span>
          </div>

          <div class="mt-6">
            <h2 class="text-lg font-semibold mb-2">Synopsis</h2>
            <p class="text-neutral-600">{{ book.description || "No description available." }}</p>
          </div>

          <div class="mt-6">
            <h2 class="text-lg font-semibold mb-2">Details</h2>
            <dl class="grid grid-cols-2 gap-4">
              <div>
                <dt class="text-sm text-neutral-500">Published</dt>
                <dd class="text-neutral-900">{{ book.publishedDate || "Unknown" }}</dd>
              </div>
              <div>
                <dt class="text-sm text-neutral-500">Pages</dt>
                <dd class="text-neutral-900">{{ book.pageCount || "N/A" }}</dd>
              </div>
              <div>
                <dt class="text-sm text-neutral-500">Rating</dt>
                <dd class="text-neutral-900">⭐️ {{ book.rating || "N/A" }}/5</dd>
              </div>
              <div>
                <dt class="text-sm text-neutral-500">ISBN</dt>
                <dd class="text-neutral-900">{{ book.isbn || "N/A" }}</dd>
              </div>
            </dl>
          </div>

          <div class="flex gap-4 mt-8">
            <a v-if="book.buyLink" :href="book.buyLink" target="_blank"
              class="flex-1 bg-primary hover:bg-primary-dark text-neutral-900 font-semibold py-3 px-6 rounded-lg text-center transition-colors">
              Buy on Amazon
            </a>
            <a v-if="book.infoLink" :href="book.infoLink" target="_blank"
              class="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-medium py-3 px-6 rounded-lg text-center transition-colors">
              View on Google Books
            </a>
          </div>
        </div>
      </div>

      <!-- Loader mientras se carga la información -->
      <div v-else class="bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse p-6">
        <div class="h-64 bg-gray-300 w-full"></div>
        <div class="mt-4">
          <div class="h-6 bg-gray-300 w-3/4 mb-2"></div>
          <div class="h-4 bg-gray-300 w-1/2 mb-2"></div>
          <div class="h-4 bg-gray-300 w-full mb-2"></div>
          <div class="h-4 bg-gray-300 w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import GoogleBooksService from '@/services/googleBooksService';

const route = useRoute();
const book = ref(null);
const placeholderImage = "https://via.placeholder.com/150";

const fetchBookDetails = async () => {
  const bookId = route.params.id;
  try {
    const result = await GoogleBooksService.getBookById(bookId);
    book.value = result;
  } catch (error) {
    console.error("Error fetching book details:", error);
  }
};

onMounted(() => {
  fetchBookDetails();
});
</script>
