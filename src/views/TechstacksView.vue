<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import techstacks from '@/data/techstacks.json'

const windowWidth = ref(window.innerWidth)

function handleResize() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="techstacks-view min-w-0">
    <div class="text-center mb-4">
      <h2 class="text-xl font-bold text-gray-800">My Tech Stack</h2>
      <p class="text-gray-500 text-xs mt-1">Technologies I work with</p>
    </div>

    <div v-if="windowWidth < 600" class="space-y-4">
      <div class="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div class="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-2">
          <h3 class="font-semibold text-white text-sm">Frontend</h3>
        </div>
        <div class="p-3">
          <div class="flex flex-wrap gap-2">
            <div
              v-for="tech in techstacks.frontend"
              :key="tech.name"
              class="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg"
            >
              <img :src="tech.icon" :alt="tech.name" class="w-5 h-5 flex-shrink-0" />
              <span class="text-sm text-gray-700 whitespace-nowrap">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div class="bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-2">
          <h3 class="font-semibold text-white text-sm">Backend</h3>
        </div>
        <div class="p-3">
          <div class="flex flex-wrap gap-2">
            <div
              v-for="tech in techstacks.backend"
              :key="tech.name"
              class="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg"
            >
              <img :src="tech.icon" :alt="tech.name" class="w-5 h-5 flex-shrink-0" />
              <span class="text-sm text-gray-700 whitespace-nowrap">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div class="bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-2">
          <h3 class="font-semibold text-white text-sm">Tools</h3>
        </div>
        <div class="p-3">
          <div class="flex flex-wrap gap-2">
            <div
              v-for="tech in techstacks.tools"
              :key="tech.name"
              class="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg"
            >
              <img :src="tech.icon" :alt="tech.name" class="w-5 h-5 flex-shrink-0" />
              <span class="text-sm text-gray-700 whitespace-nowrap">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="grid xl:grid-cols-3 lg:grid-cols-2 gap-4">
      <div class="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div class="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3">
          <h3 class="font-semibold text-white">Frontend</h3>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="tech in techstacks.frontend"
              :key="tech.name"
              class="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg"
            >
              <img :src="tech.icon" :alt="tech.name" class="w-6 h-6 flex-shrink-0" />
              <span class="text-sm text-gray-700 font-medium">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div class="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-3">
          <h3 class="font-semibold text-white">Backend</h3>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="tech in techstacks.backend"
              :key="tech.name"
              class="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg"
            >
              <img :src="tech.icon" :alt="tech.name" class="w-6 h-6 flex-shrink-0" />
              <span class="text-sm text-gray-700 font-medium">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div class="bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3">
          <h3 class="font-semibold text-white">Tools</h3>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="tech in techstacks.tools"
              :key="tech.name"
              class="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg"
            >
              <img :src="tech.icon" :alt="tech.name" class="w-6 h-6 flex-shrink-0" />
              <span class="text-sm text-gray-700 font-medium">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
