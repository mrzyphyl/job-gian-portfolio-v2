<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showToast = ref(false)

function checkMobile() {
  if (window.innerWidth < 768) {
    showToast.value = true
  }
}

function dismissToast() {
  showToast.value = false
}

onMounted(() => {
  checkMobile()
})
</script>

<template>
  <Transition name="slide-up">
    <div
      v-if="showToast"
      class="fixed bottom-14 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-2xl z-[100] flex items-center gap-3 max-w-[90vw]"
    >
      <svg
        class="w-5 h-5 text-blue-400 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
      <p class="text-sm">Desktop view recommended for best experience</p>
      <button
        @click="dismissToast"
        class="text-gray-400 hover:text-white transition-colors flex-shrink-0"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
