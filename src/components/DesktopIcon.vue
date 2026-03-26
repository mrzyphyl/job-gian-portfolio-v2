<script setup lang="ts">
import { useDesktopStore } from '@/stores/desktop'

const props = defineProps<{
  id: string
  title: string
  icon: string
  iconPath?: string
  route: string
}>()

const store = useDesktopStore()

function openWindow() {
  store.registerWindow({
    id: props.id,
    title: props.title,
    icon: props.icon,
    iconPath: props.iconPath,
    route: props.route,
    width: 700,
    height: 500,
  })
}
</script>

<template>
  <button
    @click="openWindow"
    class="desktop-icon flex flex-col items-center gap-1 p-2 rounded hover:bg-white/20 transition-colors cursor-pointer w-24 group"
  >
    <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        :d="iconPath || 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z'"
      />
    </svg>
    <span class="text-white text-xs text-center truncate w-full drop-shadow-lg px-1 rounded">
      {{ title }}
    </span>
  </button>
</template>
