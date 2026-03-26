<script setup lang="ts">
import { useDesktopStore } from '@/stores/desktop'
import DesktopIcon from './DesktopIcon.vue'
import Window from './Window.vue'
import Taskbar from './Taskbar.vue'

const store = useDesktopStore()

const desktopIcons = [
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
</script>

<template>
  <div
    class="desktop w-screen h-screen bg-cover bg-center relative overflow-hidden"
    style="background-image: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
  >
    <div class="icons-area absolute top-4 left-4 flex flex-col gap-2 z-10">
      <DesktopIcon
        v-for="icon in desktopIcons"
        :key="icon.id"
        :id="icon.id"
        :title="icon.title"
        :icon="icon.icon"
        :icon-path="iconPaths[icon.icon] || iconPaths.user"
        :route="icon.route"
      />
    </div>

    <div class="windows-container absolute inset-0 bottom-10">
      <Window
        v-for="win in store.allOpenWindows"
        :key="win.id"
        :window="win"
        @close="store.closeWindow"
        @minimize="store.minimizeWindow"
      />
    </div>

    <Taskbar />
  </div>
</template>
