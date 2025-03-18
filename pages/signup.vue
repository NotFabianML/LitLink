<template>
  <div class="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8" v-motion :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0 }">
      <h1 class="text-2xl font-bold text-center mb-8">Join LitLink</h1>

      <form @submit.prevent="handleSignup" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-neutral-700 mb-1">
            Full Name
          </label>
          <input type="text" v-model="name" required
            class="w-full rounded-lg border-neutral-300 shadow-sm focus:border-primary focus:ring-primary" />
        </div>

        <div>
          <label class="block text-sm font-medium text-neutral-700 mb-1">
            Email
          </label>
          <input type="email" v-model="email" required
            class="w-full rounded-lg border-neutral-300 shadow-sm focus:border-primary focus:ring-primary" />
        </div>

        <div>
          <label class="block text-sm font-medium text-neutral-700 mb-1">
            Password
          </label>
          <input type="password" v-model="password" required
            class="w-full rounded-lg border-neutral-300 shadow-sm focus:border-primary focus:ring-primary" />
        </div>

        <button type="submit"
          class="w-full bg-primary hover:bg-primary-dark text-neutral-900 font-semibold py-3 px-6 rounded-lg transition-colors">
          Create Account
        </button>
      </form>

      <p class="text-center mt-6 text-neutral-600">
        Already have an account?
        <NuxtLink to="/login" class="text-primary hover:text-primary-dark font-medium">
          Log in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
const name = ref('')
const email = ref('')
const password = ref('')

const handleSignup = () => {
  // Handle signup logic here
  console.log('Signup:', { name: name.value, email: email.value, password: password.value })
  navigateTo('/onboarding')
}
</script>