import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface WindowPosition {
  x: number
  y: number
  width: number
  height: number
}

export interface WindowItem {
  id: string
  title: string
  icon: string
  iconPath?: string
  route: string
  isOpen: boolean
  isMinimized: boolean
  isActive: boolean
  isMaximized: boolean
  zIndex: number
  width: number
  height: number
  position: WindowPosition
  prevPosition?: WindowPosition
}

export const useDesktopStore = defineStore('desktop', () => {
  const windows = ref<WindowItem[]>([])
  const activeWindowId = ref<string | null>(null)
  const startMenuOpen = ref(false)
  const maxZIndex = ref(100)

  const openWindows = computed(() => windows.value.filter((w) => w.isOpen && !w.isMinimized))
  const allOpenWindows = computed(() => windows.value.filter((w) => w.isOpen))

  function registerWindow(
    window: Omit<
      WindowItem,
      'isOpen' | 'isMinimized' | 'isActive' | 'isMaximized' | 'zIndex' | 'position'
    >,
  ) {
    const existingWindow = windows.value.find((w) => w.id === window.id)
    if (existingWindow) {
      existingWindow.isMinimized = false
      activateWindow(window.id)
    } else {
      const defaultWidth = window.width || 700
      const defaultHeight = window.height || 500
      windows.value.push({
        ...window,
        width: defaultWidth,
        height: defaultHeight,
        isOpen: true,
        isMinimized: false,
        isActive: false,
        isMaximized: false,
        zIndex: ++maxZIndex.value,
        position: {
          x: 100 + Math.random() * 100,
          y: 60 + Math.random() * 50,
          width: defaultWidth,
          height: defaultHeight,
        },
      })
    }
    activateWindow(window.id)
    startMenuOpen.value = false
  }

  function activateWindow(id: string) {
    windows.value.forEach((w) => {
      w.isActive = w.id === id
      if (w.id === id) {
        w.isMinimized = false
        w.zIndex = ++maxZIndex.value
      }
    })
    activeWindowId.value = id
  }

  function minimizeWindow(id: string) {
    const win = windows.value.find((w) => w.id === id)
    if (win) {
      win.isMinimized = true
      win.isActive = false
      if (activeWindowId.value === id) {
        const activeWindows = windows.value.filter((w) => w.isOpen && !w.isMinimized)
        const lastActive = activeWindows[activeWindows.length - 1]
        if (lastActive) {
          activateWindow(lastActive.id)
        } else {
          activeWindowId.value = null
        }
      }
    }
  }

  function closeWindow(id: string) {
    const index = windows.value.findIndex((w) => w.id === id)
    if (index !== -1) {
      windows.value.splice(index, 1)
      if (activeWindowId.value === id) {
        const activeWindows = windows.value.filter((w) => w.isOpen && !w.isMinimized)
        const lastActive = activeWindows[activeWindows.length - 1]
        if (lastActive) {
          activateWindow(lastActive.id)
        } else {
          activeWindowId.value = null
        }
      }
    }
  }

  function toggleMaximize(id: string) {
    const win = windows.value.find((w) => w.id === id)
    if (win) {
      if (win.isMaximized) {
        if (win.prevPosition) {
          win.position = { ...win.prevPosition }
          win.width = win.prevPosition.width
          win.height = win.prevPosition.height
        }
        win.isMaximized = false
      } else {
        win.prevPosition = { ...win.position }
        win.isMaximized = true
      }
    }
  }

  function updateWindowPosition(id: string, position: Partial<WindowPosition>) {
    const win = windows.value.find((w) => w.id === id)
    if (win) {
      win.position = { ...win.position, ...position }
      if (position.width !== undefined) win.width = position.width
      if (position.height !== undefined) win.height = position.height
    }
  }

  function toggleStartMenu() {
    startMenuOpen.value = !startMenuOpen.value
  }

  function closeStartMenu() {
    startMenuOpen.value = false
  }

  return {
    windows,
    activeWindowId,
    startMenuOpen,
    openWindows,
    allOpenWindows,
    registerWindow,
    activateWindow,
    minimizeWindow,
    closeWindow,
    toggleMaximize,
    updateWindowPosition,
    toggleStartMenu,
    closeStartMenu,
  }
})
