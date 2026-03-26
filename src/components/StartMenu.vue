<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useDesktopStore } from '@/stores/desktop'

const store = useDesktopStore()

const startMenuItems = [
  { id: 'profile', title: 'My Profile', icon: 'user', route: '/profile' },
  { id: 'techstacks', title: 'Tech Stacks', icon: 'code', route: '/techstacks' },
  { id: 'careers', title: 'Careers', icon: 'briefcase', route: '/careers' },
  { id: 'education', title: 'Education', icon: 'graduation', route: '/education' },
  { id: 'projects', title: 'Projects', icon: 'folder', route: '/projects' },
  { id: 'contact', title: 'Contact Me', icon: 'mail', route: '/contact' },
  { id: 'sql', title: 'SQL Terminal', icon: 'terminal', route: '/sql' },
]

const iconPaths: Record<string, string> = {
  user: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
  code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
  briefcase:
    'M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2',
  graduation: 'M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5',
  folder: 'M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z',
  mail: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6',
  terminal: 'M8 9l3 3-3 3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
}

function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.start-menu') && !target.closest('.start-button')) {
    store.closeStartMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

function openItem(item: (typeof startMenuItems)[0]) {
  store.registerWindow({
    id: item.id,
    title: item.title,
    icon: item.icon,
    iconPath: iconPaths[item.icon],
    route: item.route,
    width: 700,
    height: 500,
  })
}
</script>

<template>
  <div
    v-if="store.startMenuOpen"
    class="start-menu absolute bottom-12 left-0 w-80 bg-win7-window border border-win7-border shadow-xl flex"
    @click.stop
  >
    <div
      class="w-20 bg-gradient-to-b from-[#1A5FA8] to-[#085A9E] p-4 flex flex-col items-center justify-end"
    >
      <div
        class="writing-mode vertical-text text-white text-sm font-bold tracking-wider mb-4"
        style="writing-mode: vertical-rl; transform: rotate(180deg)"
      >
        JOB GIAN'S PORTFOLIO
      </div>
    </div>

    <div class="flex-1 p-2">
      <div class="text-sm font-semibold text-gray-800 mb-3 px-2">Programs</div>
      <div class="space-y-1">
        <button
          v-for="item in startMenuItems"
          :key="item.id"
          @click="openItem(item)"
          class="w-full flex items-center gap-3 px-3 py-2 text-sm text-left text-gray-800 hover:bg-win7-light-blue hover:text-white rounded-sm transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="iconPaths[item.icon]"
            />
          </svg>
          <span>{{ item.title }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
