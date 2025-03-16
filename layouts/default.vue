<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <slot />
    </main>
    <BottomNav />
  </div>
</template>

<script setup>
import BottomNav from '~/components/BottomNav.vue';
import Navbar from '~/components/Navbar.vue';

</script>
