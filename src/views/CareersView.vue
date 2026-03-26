<script setup lang="ts">
import careersData from '@/data/careers.json'

interface Career {
  role: string
  company: string
  period: string
  description: string
  achievements: string[]
}

const careers = careersData as Career[]
</script>

<template>
  <div class="careers-view">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Work Experience</h2>
      <p class="text-gray-600 text-sm">My professional journey</p>
    </div>

    <div class="space-y-4">
      <div
        v-for="(career, index) in careers"
        :key="index"
        class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
      >
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <div>
            <h3 class="font-bold text-lg text-gray-800">{{ career.role }}</h3>
            <p class="text-win7-light-blue font-medium">{{ career.company }}</p>
          </div>
          <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded mt-2 md:mt-0">
            {{ career.period }}
          </span>
        </div>

        <p class="text-gray-600 text-sm mb-3">{{ career.description }}</p>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="(achievement, i) in career.achievements"
            :key="i"
            class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1"
          >
            <span>+</span> {{ achievement }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
