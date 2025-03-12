<template>
  <div class="min-h-screen bg-neutral-50 pt-4 pb-20 px-4">
    <div class="max-w-md mx-auto relative h-[calc(100vh-8rem)]">
      <div v-for="(book, index) in books" :key="book.id" class="absolute w-full transition-transform duration-300"
        :style="{
          zIndex: books.length - index,
          transform: `scale(${1 - index * 0.05})`
        }">
        <SwipeableBookCard :book="book" @swipeLeft="handleReject" @swipeRight="handleAccept"
          @viewDetails="showDetails" />
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
import { ref, onMounted } from 'vue';
import GoogleBooksService from '@/services/googleBooksService';
import SwipeableBookCard from '@/components/SwipeableBookCard.vue';

const books = ref([]);

const fetchBooks = async () => {
  books.value = await GoogleBooksService.searchBooks('Harry Potter'); // Cambia el término de búsqueda según necesites
};

const handleAccept = () => {
  if (books.value.length) {
    // Guardar en la lista de lectura
    books.value.shift();
  }
};

const handleReject = () => {
  if (books.value.length) {
    books.value.shift();
  }
};

const showDetails = (book) => {
  navigateTo(`/book/${book.id}`);
};

onMounted(() => {
  fetchBooks();
});
</script>
