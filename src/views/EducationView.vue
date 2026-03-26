<script setup lang="ts">
import educationData from '@/data/education.json'

interface Certification {
  name: string
  issuer: string
  year: string
}

interface Education {
  school: string
  degree: string
  period: string
  gpa: string
  achievements: string[]
}

interface EducationData {
  education: Education[]
  certifications: Certification[]
}

const { education, certifications } = educationData as EducationData
</script>

<template>
  <div class="education-view">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Education</h2>
      <p class="text-gray-600 text-sm">Academic background and certifications</p>
    </div>

    <div class="space-y-4 mb-8">
      <div
        v-for="(edu, index) in education"
        :key="index"
        class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
      >
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <div>
            <h3 class="font-bold text-lg text-gray-800">{{ edu.school }}</h3>
            <p class="text-win7-light-blue font-medium">{{ edu.degree }}</p>
          </div>
          <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded mt-2 md:mt-0">
            {{ edu.period }}
          </span>
        </div>

        <p class="text-sm text-gray-600 mb-3">GPA: {{ edu.gpa }}</p>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="(achievement, i) in edu.achievements"
            :key="i"
            class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
          >
            {{ achievement }}
          </span>
        </div>
      </div>
    </div>

    <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <h3 class="font-semibold text-gray-800 mb-4">Certifications</h3>
      <div v-if="certifications && certifications.length > 0" class="space-y-3">
        <div
          v-for="(cert, index) in certifications"
          :key="index"
          class="flex items-center justify-between p-2 bg-gray-50 rounded"
        >
          <div>
            <p class="font-medium text-gray-800">{{ cert.name }}</p>
            <p class="text-xs text-gray-500">{{ cert.issuer }}</p>
          </div>
          <span class="text-xs text-gray-400">{{ cert.year }}</span>
        </div>
      </div>
      <p v-else class="text-sm text-gray-500">No certifications available</p>
    </div>
  </div>
</template>
