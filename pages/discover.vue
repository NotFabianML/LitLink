<template>
  <main class="min-h-screen bg-neutral-50 pt-4 pb-20 px-4 overflow-hidden">
    <section class="max-w-full sm:max-w-md mx-auto my-14 relative h-[calc(100vh-18rem)]">
      <SwipeableBookCard v-if="books.length" ref="cardRef" :book="books[0]" @swipeLeft="handleReject"
        @swipeRight="handleAccept" @viewDetails="showDetails" />

      <footer class="fixed bottom-24 left-0 right-0 flex justify-center gap-4 px-4">
        <button @click="triggerReject"
          class="bg-white hover:bg-neutral-100 w-16 h-16 rounded-full shadow-lg flex items-center justify-center">
          ❌
        </button>
        <button @click="triggerAccept"
          class="bg-white hover:bg-neutral-100 w-16 h-16 rounded-full shadow-lg flex items-center justify-center">
          ✅
        </button>
      </footer>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SwipeableBookCard from '@/components/SwipeableBookCard.vue';
import openLibraryService from '~/services/openLibraryService';

const books = ref([]);
const cardRef = ref(null);
const loading = ref(true);
const errorMessage = ref('');

const userPreferences = ref({
  likedBooks: [
    'The Chalk Man',
    'Someone We Know',
    'The Silent Patient',
  ],
  genres: [
    'Thriller',
    'Suspense',
    'Crime',
    'Mystery'
  ],
  authors: [
    'C.J. Tudor',
    'Shari Lapena',
    'Alex Michaelides',
  ]
});

const fetchBooks = async () => {
  try {
    loading.value = true;
    errorMessage.value = '';
    // books.value = await openLibraryService.searchBooks(userPreferences.value);

    const { searchBooks } = useLitLinkApi()
    books.value = await searchBooks(userPreferences.value)
  } catch (error) {
    errorMessage.value = 'Error cargando libros. Intenta nuevamente más tarde.';
    console.error('Error fetching books:', error);
  } finally {
    loading.value = false;
  }
};

const handleAccept = () => {
  if (books.value.length > 0) {
    books.value.shift();
  }
};

const handleReject = handleAccept;

const showDetails = (book) => {
  navigateTo(`/book/${book.workKey}`);
};

const triggerAccept = () => {
  cardRef.value?.handleTapRight();
};

const triggerReject = () => {
  cardRef.value?.handleTapLeft();
};

onMounted(() => {
  fetchBooks();
});
</script>