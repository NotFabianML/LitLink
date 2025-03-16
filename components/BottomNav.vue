<template>
  <nav class="bg-white shadow-lg fixed bottom-0 w-full">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-around py-3">
        <NuxtLink to="/discover" class="p-2">
          <Search />
        </NuxtLink>
        <NuxtLink to="/reading-list" class="p-2">
          <BookMarked />
        </NuxtLink>
        <NuxtLink to="/settings" class="p-2">
          <Settings />
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { BookMarked, Search, Settings } from 'lucide-vue-next';

// No requiere lógica adicional.
</script>
