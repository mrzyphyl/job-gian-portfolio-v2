<script setup lang="ts">
import projects from '@/data/projects.json'

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <div class="projects-view">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">My Projects</h2>
      <p class="text-gray-600 text-sm">Featured work and personal projects</p>
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <a
        v-for="(project, index) in projects"
        :key="index"
        :href="project.html_url"
        target="_blank"
        rel="noopener noreferrer"
        class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow block"
      >
        <div class="p-4">
          <div class="flex items-start justify-between mb-2">
            <h3 class="font-bold text-gray-800">{{ project.name }}</h3>
            <span
              v-if="project.language"
              class="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
            >
              {{ project.language }}
            </span>
          </div>
          <p class="text-sm text-gray-600 mb-3">
            {{ project.description || 'No description available' }}
          </p>
          <div v-if="project.tech && project.tech.length > 0" class="flex flex-wrap gap-1 mb-3">
            <span
              v-for="tech in project.tech"
              :key="tech"
              class="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
            >
              {{ tech }}
            </span>
          </div>
          <div class="flex items-center gap-4 text-xs text-gray-500">
            <span>Created: {{ formatDate(project.created_at) }}</span>
            <span>Updated: {{ formatDate(project.updated_at) }}</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
