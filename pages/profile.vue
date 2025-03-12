<template>
  <div class="min-h-screen bg-neutral-50 pt-4 pb-20 px-4">
    <div class="max-w-md mx-auto">
      <div class="bg-white rounded-2xl shadow-xl p-8" v-motion :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }">
        <div class="flex items-center gap-4 mb-8">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=default" alt="Profile"
            class="w-20 h-20 rounded-full" />
          <div>
            <h1 class="text-2xl font-bold">John Doe</h1>
            <p class="text-neutral-600">Joined March 2024</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-8">
          <div class="bg-neutral-50 rounded-lg p-4 text-center">
            <span class="block text-2xl font-bold text-neutral-900">12</span>
            <span class="text-sm text-neutral-600">Books Saved</span>
          </div>
          <div class="bg-neutral-50 rounded-lg p-4 text-center">
            <span class="block text-2xl font-bold text-neutral-900">3</span>
            <span class="text-sm text-neutral-600">Currently Reading</span>
          </div>
        </div>

        <div class="mb-8">
          <h2 class="text-lg font-semibold mb-4">Reading Preferences</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-1">
                Favorite Genres
              </label>
              <div class="flex flex-wrap gap-2">
                <span v-for="genre in user.genres" :key="genre"
                  class="bg-primary text-neutral-900 px-3 py-1 rounded-full text-sm font-medium">
                  {{ genre }}
                </span>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-1">
                Preferred Format
              </label>
              <p class="text-neutral-900">{{ user.preferredFormat }}</p>
            </div>
          </div>
        </div>

        <button @click="editProfile"
          class="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-medium py-3 px-6 rounded-lg transition-colors">
          Edit Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = ref({
  name: "John Doe",
  joinDate: "March 2024",
  genres: ["Fiction", "Sci-Fi", "Mystery"],
  preferredFormat: "Physical Books",
  booksSaved: 12,
  currentlyReading: 3
})

const editProfile = () => {
  // Navigate to edit profile page or show modal
  console.log('Edit profile clicked')
}
</script>