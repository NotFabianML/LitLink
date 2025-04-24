<template>
  <main class="min-h-screen bg-neutral-50 pt-20 pb-20 px-4 overflow-hidden">
    <section class="max-w-full sm:max-w-md mx-auto my-14 relative h-[calc(100vh-18rem)]">
      <!-- Swipeable card -->
      <SwipeableBookCard v-if="books.length" ref="cardRef" :book="books[0]" @swipeLeft="onSwipe('left')"
        @swipeRight="onSwipe('right')" @viewDetails="showDetails" />

      <!-- Cuando no hay más -->
      <div v-else class="text-center text-neutral-600">
        No more recommendations.
      </div>

      <!-- Botones externos -->
      <footer class="fixed bottom-24 left-0 right-0 flex justify-center gap-4 px-4">
        <button @click="triggerSwipe('left')" class="btn-swipe no">❌</button>
        <button @click="triggerSwipe('right')" class="btn-swipe yes">✅</button>
      </footer>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import SwipeableBookCard from '~/components/SwipeableBookCard.vue'
import { navigateTo, useNuxtApp } from '#app'
import type { Book } from '~/services/openLibraryService'
import openLibraryService from '~/services/openLibraryService'

const auth = useAuthStore()
const nuxt = useNuxtApp()

const books = ref<Book[]>([])
const cardRef = ref<InstanceType<typeof SwipeableBookCard> | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)

// 1) Traer recomendaciones del backend
// async function fetchRecs() {
//   if (!auth.preferences) return
//   const res = await nuxt.$books.recommend({
//     likedBooks: auth.preferences.favorite_books,
//     authors:    auth.preferences.favorite_authors,
//     genres:     auth.preferences.favorite_genres,
//   })
//   books.value = res.data
// }

const fetchRecs = async () => {
  if (!auth.preferences) return
  books.value = await openLibraryService.recommend({
    likedBooks: auth.preferences.favorite_books,
    genres: auth.preferences.favorite_genres,
    authors: auth.preferences.favorite_authors,
  })
}

// 2) Manejar swipe y registrar la acción
async function onSwipe(direction: 'left' | 'right') {
  if (!books.value.length || !auth.user) return
  const book = books.value[0]
  try {
    await nuxt.$bookActions.create({
      book_id: book.workKey,
      swipe_action: direction,
      status: direction === 'right' ? 'want_to_read' : undefined
    })
  } catch (e) {
    console.error('Error saving action:', e)
  }
  // Avanza a la siguiente
  books.value.shift()
  // Si se acaban, recarga
  if (!books.value.length) fetchRecs()
}

// 3) Botones externos
function triggerSwipe(dir: 'left' | 'right') {
  if (dir === 'left') cardRef.value?.handleTapLeft()
  else cardRef.value?.handleTapRight()
}

// 4) Ver detalles
function showDetails(book: Book) {
  navigateTo(`/book/${encodeURIComponent(book.workKey)}`)
}

// 5) Montar
onMounted(fetchRecs)
</script>

<style scoped>
.btn-swipe {
  width: 4rem;
  height: 4rem;
  background: white;
  border-radius: 9999px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-swipe.no {
  /* ❌ */
}

.btn-swipe.yes {
  /* ✅ */
}
</style>
