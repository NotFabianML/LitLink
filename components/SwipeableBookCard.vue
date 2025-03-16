<template>
  <div
    class="rounded-2xl shadow-xl overflow-hidden transition-all duration-500 select-none relative h-[calc(100vh-15rem)]"
    :style="{ transform: computedTransform }">
    <!-- Toast de feedback -->
    <div v-if="showFeedback"
      class="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 z-30"
      :style="{ opacity: feedbackOpacity }">
      <div class="px-4 py-2 bg-white bg-opacity-90 border border-current rounded-full shadow-lg">
        <span :class="feedbackColor" class="text-xl font-bold">{{ feedbackText }}</span>
      </div>
    </div>

    <!-- Contenedor del flip card -->
    <div class="w-full h-full transition-transform duration-500 [transform-style:preserve-3d]"
      :class="{ '[transform:rotateY(180deg)]': isFlipped }">
      <!-- Cara frontal -->
      <div class="[backface-visibility:hidden] absolute inset-0">
        <img :src="book.coverUrl || placeholderImage" alt="Book Cover" class="w-full h-full" />

        <!-- Overlay de detalles -->
        <div
          class="absolute bottom-0 left-0 w-full p-4 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100">
          <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-white">{{ book.title }}</h3>
          <p class="text-xs sm:text-sm md:text-base text-white">{{ book.authors.join(', ') }}</p>
          <div class="mt-2">
            <span v-for="subject in book.subjects.slice(0, 3)" :key="subject"
              class="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full mr-2 font-semibold mt-1">
              {{ subject }}
            </span>
          </div>
        </div>
      </div>

      <!-- Cara trasera -->
      <div
        class="[backface-visibility:hidden] [transform:rotateY(180deg)] absolute inset-0 bg-white p-4 overflow-y-auto">
        <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-neutral-800 mb-2">{{ book.title }}</h3>
        <p class="text-xs sm:text-sm md:text-base text-neutral-600 mb-4">{{ book.authors.join(', ') }}</p>
        <p class="text-xs sm:text-sm md:text-base text-neutral-700">
          {{ truncatedDescription }}
        </p>
      </div>
    </div>

    <!-- Botón para flip -->
    <button @click.stop="toggleDetails"
      class="absolute top-2 right-2 z-20 p-2 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-transform duration-300"
      :class="{ 'rotate-180': isFlipped }">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
      </svg>
    </button>

    <!-- Áreas de swipe -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-y-0 left-0 w-1/2 pointer-events-auto" @click="handleTapLeft"></div>
      <div class="absolute inset-y-0 right-0 w-1/2 pointer-events-auto" @click="handleTapRight"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { truncateWords } from '@/utils/textUtils';

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
});

const emits = defineEmits(['swipeLeft', 'swipeRight', 'viewDetails']);

const placeholderImage = 'https://placehold.co/128x213';
const offsetX = ref(0);
const actionTaken = ref(null);
const isFlipped = ref(false);

const computedTransform = computed(() => {
  const tilt = offsetX.value / 10;
  return `translateX(${offsetX.value}px) rotate(${tilt}deg)`;
});

// Resto de computed properties y métodos se mantienen igual...
const truncatedDescription = computed(() => {
  return truncateWords(props.book.description || '', 200);
});

const toggleDetails = () => {
  isFlipped.value = !isFlipped.value;
};

// Mantener el resto del código del script sin cambios...
// Manejo de taps en las áreas invisibles para tomar decisiones
const handleTapLeft = () => {
  animateSwipe('left');
};

const handleTapRight = () => {
  animateSwipe('right');
};

// Función para animar la decisión (simula un swipe) con animación suave y feedback
const animateSwipe = (direction) => {
  if (direction === 'left') {
    actionTaken.value = 'nope';
    offsetX.value = -150; // Desplazamiento a la izquierda
    setTimeout(() => {
      emits('swipeLeft');
      resetCard();
    }, 200);
  } else if (direction === 'right') {
    actionTaken.value = 'like';
    offsetX.value = 150; // Desplazamiento a la derecha
    setTimeout(() => {
      emits('swipeRight');
      resetCard();
    }, 200);
  }
};

const resetCard = () => {
  offsetX.value = 0;
  actionTaken.value = null;
};

// Método para ver detalles (para lógica adicional o navegación)
const viewDetails = () => {
  emits('viewDetails', props.book);
};

defineExpose({ handleTapLeft, handleTapRight, toggleDetails });
</script>