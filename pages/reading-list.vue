<template>
  <ClientOnly>
    <div class="min-h-screen bg-neutral-50 pt-4 pb-20 px-4">
      <div class="max-w-2xl mx-auto">
        <!-- Encabezado con filtros y export -->
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

        <!-- Loading state -->
        <div v-if="loading" class="text-center py-8">Loading…</div>

        <!-- Grid de libros -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div v-for="action in filteredBooks" :key="action.id" class="bg-white rounded-lg shadow-md overflow-hidden">
            <img :src="action.metadata.cover_url" :alt="action.metadata.title" class="w-full h-40 object-cover" />

            <!-- Contenido -->
            <div class="p-4 space-y-2">
              <h3 class="font-semibold text-base">{{ action.metadata.title }}</h3>
              <p class="text-neutral-600 text-xs">{{ action.metadata.authors.join(', ') }}</p>
              <p class="text-neutral-600 text-xs">
                Pages: <strong>{{ action.metadata.pages || 'N/A' }}</strong>
                | Published: <strong>{{ action.metadata.publish_date || 'N/A' }}</strong>
              </p>

              <!-- Estado y toggle -->
              <div class="flex items-center justify-between mt-2">
                <span class="text-xs bg-neutral-100 px-2 py-1 rounded-full">
                  {{ action.status === 'reading' ? 'Reading' : 'Want to read' }}
                </span>
                <button @click="toggleStatus(action)" :class="[
                  'text-xs px-2 py-1 rounded-full',
                  action.status === 'reading'
                    ? 'bg-primary text-neutral-900'
                    : 'bg-neutral-100'
                ]">
                  {{ action.status === 'reading' ? 'Mark Want to Read' : 'Mark Reading' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useNuxtApp } from '#app'

interface BookAction {
  id: string
  status: string
  metadata: {
    title: string
    authors: string[]
    cover_url: string
    pages?: number
    publish_date?: string
    subjects?: string[]
  }
}

const nuxt = useNuxtApp()
const filter = ref('all')
const genres = ref<string[]>([])
const actions = ref<BookAction[]>([])
const loading = ref(true)

async function fetchReadingList() {
  loading.value = true
  try {
    const { data } = await nuxt.$bookActions.getAll()
    actions.value = data

    genres.value = Array.from(
      new Set(
        data.flatMap((a: BookAction) =>
          a.metadata.subjects || []
        )
      )
    )
  } catch (e) {
    console.error('Error loading reading list', e)
  } finally {
    loading.value = false
  }
}

const filteredBooks = computed(() =>
  filter.value === 'all'
    ? actions.value
    : actions.value.filter(a =>
      a.metadata.subjects?.includes(filter.value)
    )
)

async function toggleStatus(action: BookAction) {
  const newStatus = action.status === 'reading' ? 'want_to_read' : 'reading'
  try {
    await nuxt.$bookActions.update(action.id, { status: newStatus })
    action.status = newStatus
  } catch (e) {
    console.error('Error updating status', e)
  }
}

// 4) Exportar CSV
function exportList() {
  const csv = actions.value
    .map(
      a =>
        `"${a.metadata.title}","${a.metadata.authors.join(
          ';'
        )}","${a.status}","${a.metadata.pages || ''}","${a.metadata.publish_date ||
        ''}"`
    )
    .join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'reading-list.csv'
  a.click()
}

onMounted(fetchReadingList)
</script>
