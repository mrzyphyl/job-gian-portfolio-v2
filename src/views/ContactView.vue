<script setup lang="ts">
import { ref } from 'vue'
import emailjs from 'emailjs-com'
import contactInfo from '@/data/contact.json'

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const submitted = ref(false)
const error = ref(false)
const loading = ref(false)

async function handleSubmit() {
  loading.value = true
  error.value = false

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        user_name: formData.value.name,
        user_email: formData.value.email,
        user_subject: formData.value.subject,
        message: formData.value.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    )

    submitted.value = true
    formData.value = { name: '', email: '', subject: '', message: '' }
    setTimeout(() => {
      submitted.value = false
    }, 5000)
  } catch (err) {
    console.error('EmailJS Error:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="contact-view">
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Contact Me</h2>
      <p class="text-gray-600 text-sm">Let's work together</p>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-semibold text-gray-800 mb-3">Get in Touch</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <span class="text-gray-500">@</span>
              <div>
                <p class="text-xs text-gray-500">Email</p>
                <a
                  :href="`mailto:${contactInfo.email}`"
                  class="text-sm text-win7-light-blue hover:underline"
                >
                  {{ contactInfo.email }}
                </a>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-gray-500">#</span>
              <div>
                <p class="text-xs text-gray-500">Phone</p>
                <p class="text-sm text-gray-700">{{ contactInfo.phone }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-gray-500">*</span>
              <div>
                <p class="text-xs text-gray-500">Location</p>
                <p class="text-sm text-gray-700">{{ contactInfo.location }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-green-50 p-4 rounded-lg border border-green-200 shadow-sm">
          <div class="flex items-center gap-2 text-green-700">
            <span class="font-medium">{{ contactInfo.availability }}</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div v-if="submitted" class="text-center py-8">
          <span class="text-4xl text-green-500">*</span>
          <p class="mt-2 text-green-600 font-medium">Message sent successfully!</p>
          <p class="text-sm text-gray-500">I'll get back to you soon.</p>
        </div>
        <div v-else-if="error" class="text-center py-8">
          <span class="text-4xl text-red-500">!</span>
          <p class="mt-2 text-red-600 font-medium">Failed to send message</p>
          <p class="text-sm text-gray-500">Please try again or email directly.</p>
        </div>
        <form v-else @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm text-gray-600 mb-1">Name</label>
            <input
              v-model="formData.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-win7-light-blue"
              placeholder="Your name"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">Email</label>
            <input
              v-model="formData.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-win7-light-blue"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">Subject</label>
            <input
              v-model="formData.subject"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-win7-light-blue"
              placeholder="Subject"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">Message</label>
            <textarea
              v-model="formData.message"
              rows="4"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-win7-light-blue resize-none"
              placeholder="Your message..."
            ></textarea>
          </div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2 bg-win7-light-blue text-white font-medium rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Sending...</span>
            <span v-else>@</span>
            <span v-if="!loading">Send Message</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
