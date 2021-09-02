import { createRouter, createWebHistory } from 'vue-router'

const routes = [

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
    meta: {requiresAuth: true},
    component: () => import('../views/Compte.vue')
  },
  {
    path: '/create',
    name: 'Create',
    meta: {requiresAuth: true},
    component: () => import('../views/Create.vue')
  },
  {
    path: '/postedit',
    name: 'PostEdit',
    meta: {requiresAuth: true},
    component: () => import('../views/PostEdit.vue')
  },
  {
    path: '/comment',
    name: 'Comment',
    meta: {requiresAuth: true},
    component: () => import('../views/Comment.vue')
  },
  {
    path: '/createcomment',
    name: 'CreateComment',
    meta: {requiresAuth: true},
    component: () => import('../views/CreateComment.vue')
  },
  {
    path: '/forum',
    name: 'Forum',
    meta: {requiresAuth: true},
    component: () => import('../views/Forum.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});



export default router;
