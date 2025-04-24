<template>
  <nav class="bg-white shadow-sm fixed top-0 w-full z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <NuxtLink to="/" class="text-2xl font-bold text-neutral-900">LitLink</NuxtLink>
      <div>
        <NuxtLink v-if="auth.isAuthenticated" to="/profile" class="p-2 rounded-full hover:bg-neutral-100">
          <img :src="avatarUrl" alt="Profile" class="w-8 h-8 rounded-full object-cover" />
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

const avatarUrl = computed(() => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${auth.user?.email || 'default'}`
})
</script>
