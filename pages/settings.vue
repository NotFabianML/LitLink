<template>
  <div class="min-h-screen bg-neutral-50 pt-4 pb-20 px-4">
    <div class="max-w-md mx-auto">
      <div class="bg-white rounded-2xl shadow-xl p-8" v-motion :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }">
        <h1 class="text-2xl font-bold mb-8">Settings</h1>

        <div class="space-y-6">
          <div>
            <h2 class="text-lg font-semibold mb-4">Notifications</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-neutral-700">Email Notifications</span>
                <button @click="settings.emailNotifications = !settings.emailNotifications" :class="[
                  'relative inline-flex h-6 w-11 items-center rounded-full',
                  settings.emailNotifications ? 'bg-primary' : 'bg-neutral-200'
                ]">
                  <span :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white transition',
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  ]" />
                </button>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-neutral-700">Push Notifications</span>
                <button @click="settings.pushNotifications = !settings.pushNotifications" :class="[
                  'relative inline-flex h-6 w-11 items-center rounded-full',
                  settings.pushNotifications ? 'bg-primary' : 'bg-neutral-200'
                ]">
                  <span :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white transition',
                    settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  ]" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <h2 class="text-lg font-semibold mb-4">Privacy</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-neutral-700">Public Profile</span>
                <button @click="settings.publicProfile = !settings.publicProfile" :class="[
                  'relative inline-flex h-6 w-11 items-center rounded-full',
                  settings.publicProfile ? 'bg-primary' : 'bg-neutral-200'
                ]">
                  <span :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white transition',
                    settings.publicProfile ? 'translate-x-6' : 'translate-x-1'
                  ]" />
                </button>
              </div>
            </div>
          </div>

          <div class="pt-4">
            <button @click="logout"
              class="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-medium py-3 px-6 rounded-lg transition-colors">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const settings = ref({
  emailNotifications: true,
  pushNotifications: false,
  publicProfile: true
})

const logout = () => {
  // Handle logout
  navigateTo('/login')
}
</script>