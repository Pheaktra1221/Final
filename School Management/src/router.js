import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from './components/LoginForm.vue'
import Dashboard from './components/Dashboard.vue'

const routes = [
  { path: '/', name: 'login', component: LoginForm },
  { path: '/dashboard', name: 'dashboard', component: Dashboard },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
