import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '@/views/ProfileView.vue'
import TechstacksView from '@/views/TechstacksView.vue'
import CareersView from '@/views/CareersView.vue'
import EducationView from '@/views/EducationView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ContactView from '@/views/ContactView.vue'
import SqlView from '@/views/SqlView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/profile',
    },
    {
      path: '/profile',
      components: {
        '/profile': ProfileView,
      },
    },
    {
      path: '/techstacks',
      components: {
        '/techstacks': TechstacksView,
      },
    },
    {
      path: '/careers',
      components: {
        '/careers': CareersView,
      },
    },
    {
      path: '/education',
      components: {
        '/education': EducationView,
      },
    },
    {
      path: '/projects',
      components: {
        '/projects': ProjectsView,
      },
    },
    {
      path: '/contact',
      components: {
        '/contact': ContactView,
      },
    },
    {
      path: '/sql',
      components: {
        '/sql': SqlView,
      },
    },
  ],
})

export default router
