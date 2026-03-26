<script setup lang="ts">
import { ref, computed, onUnmounted, h, type Component } from 'vue'
import { useDesktopStore, type WindowItem } from '@/stores/desktop'
import ProfileView from '@/views/ProfileView.vue'
import TechstacksView from '@/views/TechstacksView.vue'
import CareersView from '@/views/CareersView.vue'
import EducationView from '@/views/EducationView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ContactView from '@/views/ContactView.vue'
import SqlView from '@/views/SqlView.vue'

const props = defineProps<{
  window: WindowItem
}>()

const store = useDesktopStore()
const isDragging = ref(false)
const isResizing = ref(false)
const dragOffset = ref({ x: 0, y: 0 })
const resizeDir = ref('')
const resizeStart = ref({ x: 0, y: 0, width: 0, height: 0, posX: 0, posY: 0 })

const viewComponents: Record<string, Component> = {
  '/profile': ProfileView,
  '/techstacks': TechstacksView,
  '/careers': CareersView,
  '/education': EducationView,
  '/projects': ProjectsView,
  '/contact': ContactView,
  '/sql': SqlView,
}

const currentView = computed(
  () => viewComponents[props.window.route] || h('div', { class: 'p-4' }, 'Content not found'),
)

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

const windowStyle = computed(() => {
  if (props.window.isMaximized) {
    return {
      left: '0',
      top: '0',
      width: '100vw',
      height: 'calc(100vh - 40px)',
      zIndex: props.window.zIndex,
    }
  }
  return {
    left: `${props.window.position.x}px`,
    top: `${props.window.position.y}px`,
    zIndex: props.window.zIndex,
    width: `${props.window.position.width}px`,
    height: `${props.window.position.height}px`,
  }
})

function startDrag(e: MouseEvent) {
  if ((e.target as HTMLElement).closest('.window-controls')) return
  if (props.window.isMaximized) return

  isDragging.value = true
  dragOffset.value = {
    x: e.clientX - props.window.position.x,
    y: e.clientY - props.window.position.y,
  }
  store.activateWindow(props.window.id)
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

function onDrag(e: MouseEvent) {
  if (!isDragging.value) return
  const newX = Math.max(0, Math.min(window.innerWidth - 200, e.clientX - dragOffset.value.x))
  const newY = Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragOffset.value.y))
  store.updateWindowPosition(props.window.id, { x: newX, y: newY })
}

function stopDrag() {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

function startResize(e: MouseEvent, dir: string) {
  if (props.window.isMaximized) return
  e.preventDefault()
  e.stopPropagation()
  isResizing.value = true
  resizeDir.value = dir
  resizeStart.value = {
    x: e.clientX,
    y: e.clientY,
    width: props.window.position.width,
    height: props.window.position.height,
    posX: props.window.position.x,
    posY: props.window.position.y,
  }
  store.activateWindow(props.window.id)
  document.addEventListener('mousemove', onResize)
  document.addEventListener('mouseup', stopResize)
}

function onResize(e: MouseEvent) {
  if (!isResizing.value) return

  const dx = e.clientX - resizeStart.value.x
  const dy = e.clientY - resizeStart.value.y
  const minWidth = 400
  const minHeight = 300

  let newWidth = resizeStart.value.width
  let newHeight = resizeStart.value.height
  let newX = resizeStart.value.posX
  let newY = resizeStart.value.posY

  if (resizeDir.value.includes('e')) {
    newWidth = Math.max(minWidth, resizeStart.value.width + dx)
  }
  if (resizeDir.value.includes('w')) {
    const potentialWidth = Math.max(minWidth, resizeStart.value.width - dx)
    if (potentialWidth > minWidth) {
      newWidth = potentialWidth
      newX = resizeStart.value.posX + dx
    }
  }
  if (resizeDir.value.includes('s')) {
    newHeight = Math.max(minHeight, resizeStart.value.height + dy)
  }
  if (resizeDir.value.includes('n')) {
    const potentialHeight = Math.max(minHeight, resizeStart.value.height - dy)
    if (potentialHeight > minHeight) {
      newHeight = potentialHeight
      newY = resizeStart.value.posY + dy
    }
  }

  store.updateWindowPosition(props.window.id, {
    x: newX,
    y: newY,
    width: newWidth,
    height: newHeight,
  })
}

function stopResize() {
  isResizing.value = false
  resizeDir.value = ''
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
}

function close() {
  store.closeWindow(props.window.id)
}

function minimize() {
  store.minimizeWindow(props.window.id)
}

function toggleMaximize() {
  store.toggleMaximize(props.window.id)
}

function activate() {
  store.activateWindow(props.window.id)
}

function getWindowIconPath(id: string) {
  return iconPaths[id] || iconPaths.profile
}

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
})
</script>

<template>
  <div
    v-show="!window.isMinimized"
    class="window absolute bg-win7-window border border-win7-border shadow-2xl flex flex-col overflow-hidden select-none"
    :class="{ 'ring-2 ring-win7-light-blue': window.isActive }"
    :style="windowStyle"
    @mousedown="activate"
  >
    <div
      class="title-bar h-8 flex items-center justify-between px-2 flex-shrink-0"
      :class="[
        window.isActive
          ? 'bg-gradient-to-r from-[#1070B3] via-[#0870B8] to-[#0078D4]'
          : 'bg-gradient-to-r from-[#E8E8E8] via-[#DADADA] to-[#E8E8E8]',
        window.isMaximized ? 'cursor-default' : 'cursor-move',
      ]"
      @mousedown="startDrag"
    >
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="getWindowIconPath(window.id)"
          />
        </svg>
        <span
          class="text-sm font-semibold"
          :class="window.isActive ? 'text-white' : 'text-gray-800'"
        >
          {{ window.title }}
        </span>
      </div>

      <div class="window-controls flex" @mousedown.stop>
        <button
          @click="minimize"
          class="w-7 h-7 flex items-center justify-center hover:bg-gray-400 transition-colors"
        >
          <span :class="window.isActive ? 'text-white' : 'text-gray-800'">─</span>
        </button>
        <button
          @click="toggleMaximize"
          class="w-7 h-7 flex items-center justify-center hover:bg-gray-400 transition-colors"
        >
          <span :class="window.isActive ? 'text-white' : 'text-gray-800'">{{
            window.isMaximized ? '❐' : '□'
          }}</span>
        </button>
        <button
          @click="close"
          class="w-7 h-7 flex items-center justify-center hover:bg-red-500 transition-colors"
        >
          <span :class="window.isActive ? 'text-white' : 'text-gray-800'">✕</span>
        </button>
      </div>
    </div>

    <div class="content flex-1 overflow-auto bg-white p-4">
      <component :is="currentView" />
    </div>

    <template v-if="!window.isMaximized">
      <div class="resize-handle resize-n" @mousedown="(e) => startResize(e, 'n')"></div>
      <div class="resize-handle resize-s" @mousedown="(e) => startResize(e, 's')"></div>
      <div class="resize-handle resize-e" @mousedown="(e) => startResize(e, 'e')"></div>
      <div class="resize-handle resize-w" @mousedown="(e) => startResize(e, 'w')"></div>
      <div class="resize-handle resize-ne" @mousedown="(e) => startResize(e, 'ne')"></div>
      <div class="resize-handle resize-nw" @mousedown="(e) => startResize(e, 'nw')"></div>
      <div class="resize-handle resize-se" @mousedown="(e) => startResize(e, 'se')"></div>
      <div class="resize-handle resize-sw" @mousedown="(e) => startResize(e, 'sw')"></div>
    </template>
  </div>
</template>

<style scoped>
.resize-n {
  position: absolute;
  top: -3px;
  left: 8px;
  right: 8px;
  height: 6px;
  cursor: n-resize;
}
.resize-s {
  position: absolute;
  bottom: -3px;
  left: 8px;
  right: 8px;
  height: 6px;
  cursor: s-resize;
}
.resize-e {
  position: absolute;
  right: -3px;
  top: 8px;
  bottom: 8px;
  width: 6px;
  cursor: e-resize;
}
.resize-w {
  position: absolute;
  left: -3px;
  top: 8px;
  bottom: 8px;
  width: 6px;
  cursor: w-resize;
}
.resize-ne {
  position: absolute;
  top: -3px;
  right: -3px;
  width: 10px;
  height: 10px;
  cursor: ne-resize;
}
.resize-nw {
  position: absolute;
  top: -3px;
  left: -3px;
  width: 10px;
  height: 10px;
  cursor: nw-resize;
}
.resize-se {
  position: absolute;
  bottom: -3px;
  right: -3px;
  width: 10px;
  height: 10px;
  cursor: se-resize;
}
.resize-sw {
  position: absolute;
  bottom: -3px;
  left: -3px;
  width: 10px;
  height: 10px;
  cursor: sw-resize;
}
</style>
