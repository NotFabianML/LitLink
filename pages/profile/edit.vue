<template>
  <div class="min-h-screen bg-neutral-50 pt-4 pb-20 px-4">
    <div class="max-w-md mx-auto">
      <div class="bg-white rounded-2xl shadow-xl p-8" v-motion :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }">
        <h1 class="text-2xl font-bold mb-8">Edit Profile</h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1">
              Profile Picture
            </label>
            <div class="flex items-center gap-4">
              <img :src="form.avatar" alt="Profile" class="w-20 h-20 rounded-full" />
              <button type="button" class="text-sm text-neutral-600 hover:text-neutral-900">
                Change Photo
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1">
              Full Name
            </label>
            <input type="text" v-model="form.name"
              class="w-full rounded-lg border-neutral-300 shadow-sm focus:border-primary focus:ring-primary" />
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1">
              Email
            </label>
            <input type="email" v-model="form.email"
              class="w-full rounded-lg border-neutral-300 shadow-sm focus:border-primary focus:ring-primary" />
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1">
              Current Password
            </label>
            <input type="password" v-model="form.currentPassword"
              class="w-full rounded-lg border-neutral-300 shadow-sm focus:border-primary focus:ring-primary" />
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1">
              New Password
            </label>
            <input type="password" v-model="form.newPassword"
              class="w-full rounded-lg border-neutral-300 shadow-sm focus:border-primary focus:ring-primary" />
          </div>

          <div class="flex gap-4 pt-4">
            <button type="button" @click="() => navigateTo('/profile')"
              class="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-medium py-3 px-6 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit"
              class="flex-1 bg-primary hover:bg-primary-dark text-neutral-900 font-semibold py-3 px-6 rounded-lg transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
  name: 'John Doe',
  email: 'john@example.com',
  currentPassword: '',
  newPassword: ''
})

const handleSubmit = () => {
  // Handle form submission
  console.log('Profile update:', form.value)
  navigateTo('/profile')
}
</script>