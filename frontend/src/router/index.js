import { createRouter, createWebHistory } from 'vue-router'

const routes = [

  
  {
    path: '/accueil',
    name: 'Accueil',
    component: () => import('../views/Accueil.vue')
  },
  {
    path: '/inscription',
    name: 'Inscription',
    component: () => import('../views/Inscription.vue')
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: () => import('../views/Connexion.vue')
  },
  {
    path: '/compte',
    name: 'Compte',
    component: () => import('../views/Compte.vue')
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('../views/Create.vue')
  },
  {
    path: '/postedit',
    name: 'PostEdit',
    component: () => import('../views/PostEdit.vue')
  },
  {
    path: '/comment',
    name: 'Comment',
    component: () => import('../views/Comment.vue')
  },
  {
    path: '/createcomment',
    name: 'CreateComment',
    component: () => import('../views/CreateComment.vue')
  },
  {
    path: '/forum',
    name: 'Forum',
    component: () => import('../views/Forum.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
