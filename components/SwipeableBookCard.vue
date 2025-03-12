<template>
  <div class="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform duration-300"
    v-touch:swipeleft="swipeLeft" v-touch:swiperight="swipeRight">
    <img :src="book.coverUrl || placeholderImage" alt="Book Cover" class="w-full h-64 object-cover" />
    <div class="p-6">
      <h3 class="text-xl font-bold">{{ book.title }}</h3>
      <p class="text-neutral-600">{{ book.authors.join(', ') }}</p>

      <span v-if="book.categories?.length"
        class="inline-block bg-neutral-100 rounded-full px-3 py-1 text-sm font-semibold text-neutral-700 mt-2">
        {{ book.categories[0] }}
      </span>

      <button @click="viewDetails"
        class="mt-4 w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-medium py-2 px-4 rounded-lg transition-colors">
        View Details
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
});

const emits = defineEmits(['swipeLeft', 'swipeRight', 'viewDetails']);

const placeholderImage = 'https://via.placeholder.com/150';

const swipeLeft = () => emits('swipeLeft');
const swipeRight = () => emits('swipeRight');
const viewDetails = () => emits('viewDetails', props.book);
</script>
