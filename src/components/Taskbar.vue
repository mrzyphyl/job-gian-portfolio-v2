<script setup lang="ts">
import { computed } from 'vue'
import { useDesktopStore } from '@/stores/desktop'
import StartMenu from './StartMenu.vue'

const store = useDesktopStore()

const currentTime = computed(() => {
  const now = new Date()
  return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
})

const currentDate = computed(() => {
  const now = new Date()
  return now.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
})

const iconPaths: Record<string, string> = {
  profile: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
  techstacks: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
  careers:
    'M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2',
  education: 'M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5',
  projects: 'M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z',
  contact:
    'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6',
  sql: 'M8 9l3 3-3 3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
}

function getWindowIconPath(id: string) {
  return iconPaths[id] || iconPaths.profile
}

function handleTaskbarClick(win: { id: string; isMinimized: boolean; isActive: boolean }) {
  if (win.isMinimized) {
    store.activateWindow(win.id)
  } else if (win.isActive) {
    store.minimizeWindow(win.id)
  } else {
    store.activateWindow(win.id)
  }
}
</script>

<template>
  <div
    class="taskbar fixed bottom-0 left-0 right-0 h-10 bg-win7-gray border-t border-win7-medium-gray flex items-center justify-between px-2 z-50"
  >
    <div class="flex items-center gap-1">
      <button
        @click.stop="store.toggleStartMenu"
        class="start-button h-9 px-3 flex items-center gap-2 rounded-sm hover:bg-win7-medium-gray transition-colors"
        :class="{ 'bg-win7-medium-gray': store.startMenuOpen }"
      >
        <img src="/logo.png" alt="Logo" class="w-6 h-6 object-contain" />
        <span class="text-white text-sm font-semibold">Start</span>
      </button>

      <div class="h-6 w-px bg-win7-medium-gray mx-1"></div>

      <button
        v-for="win in store.allOpenWindows"
        :key="win.id"
        @click.stop="handleTaskbarClick(win)"
        class="h-9 px-2 flex items-center gap-2 rounded-sm hover:bg-win7-medium-gray transition-colors"
        :class="{ 'bg-win7-medium-gray': win.isActive }"
      >
        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="getWindowIconPath(win.id)"
          />
        </svg>
        <span class="text-white text-sm max-w-32 truncate">{{ win.title }}</span>
      </button>
    </div>

    <div class="flex items-center gap-3 pr-3">
      <div
        class="flex items-center gap-2 text-white text-xs px-2 py-1 hover:bg-win7-medium-gray rounded cursor-default"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
          />
        </svg>
        <span>Guest</span>
      </div>

      <div class="flex flex-col items-end text-white text-xs leading-tight">
        <span>{{ currentTime }}</span>
        <span>{{ currentDate }}</span>
      </div>
    </div>

    <StartMenu />
  </div>
</template>
