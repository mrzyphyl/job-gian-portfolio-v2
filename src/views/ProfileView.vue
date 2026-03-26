<script setup lang="ts">
import profile from '@/data/profile.json'

const socialIcons: Record<string, string> = {
  GitHub:
    'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z',
  LinkedIn:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
}

const socialIcon = (name: string) => socialIcons[name] || socialIcons.GitHub
</script>

<template>
  <div class="profile-view space-y-4">
    <div
      class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-4"
    >
      <img
        :src="profile.avatar"
        :alt="profile.name"
        class="w-24 h-24 rounded-full border-4 border-win7-light-blue shadow-lg bg-white flex-shrink-0"
      />
      <div class="text-center sm:text-left">
        <h2 class="text-xl font-bold text-gray-800">{{ profile.name }}</h2>
        <p class="text-win7-light-blue font-medium text-sm">{{ profile.title }}</p>
        <p class="text-gray-600 text-sm mt-2">{{ profile.bio }}</p>
      </div>
    </div>

    <div class="grid sm:grid-cols-2 gap-4">
      <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h3 class="font-semibold text-gray-800 mb-3">Contact Information</h3>
        <div class="space-y-2 text-sm">
          <div class="flex items-center gap-2">
            <span class="text-gray-500 w-4">@</span>
            <a
              :href="`mailto:${profile.email}`"
              class="text-gray-600 hover:text-win7-light-blue truncate"
            >
              {{ profile.email }}
            </a>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-gray-500 w-4">#</span>
            <a :href="`tel:${profile.phone}`" class="text-gray-600 hover:text-win7-light-blue">
              {{ profile.phone }}
            </a>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-gray-500 w-4">*</span>
            <span class="text-gray-600">{{ profile.location }}</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h3 class="font-semibold text-gray-800 mb-3">Connect With Me</h3>
        <div class="flex flex-wrap gap-2">
          <a
            v-for="social in profile.socials"
            :key="social.name"
            :href="social.url"
            target="_blank"
            class="px-3 py-2 text-white rounded text-sm flex items-center gap-2 transition-colors"
            :class="social.color"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path :d="socialIcon(social.name)" />
            </svg>
            {{ social.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
