<template>
  <nav class="bg-white shadow-sm fixed top-0 w-full z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <NuxtLink to="/" class="flex items-center">
          <span class="text-2xl font-bold text-neutral-900">LitLink</span>
        </NuxtLink>
        <NuxtLink to="/profile" class="flex items-center p-2 rounded-full hover:bg-neutral-100">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=default" alt="Profile"
            class="w-8 h-8 rounded-full" />
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
// No requiere lógica adicional.
</script>
