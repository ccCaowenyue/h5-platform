import { createRouter, createWebHistory } from 'vue-router'
import h5 from './../views/entry/h5Entry.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/h5',
      name: 'h5',
      component: h5
    }
  ]
})

export default router
