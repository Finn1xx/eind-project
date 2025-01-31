import { createRouter, createWebHistory } from 'vue-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Zorg dat het pad correct is!

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/video.vue')
    },
    {
      path: '/liked',
      name: 'liked',
      component: () => import('../views/liked.vue')
    },
    {
      path: "/movie/:id",
      name: "movie",
      component: () => import("../views/movie.vue"),
      props: true
    },
    
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register.vue'),
      beforeEnter: (to, from, next) => {
        // Voorkomen dat ingelogde gebruikers de registerpagina bezoeken
        onAuthStateChanged(auth, (user) => {
          if (user) {
            next('/'); // Als ingelogd, doorsturen naar home
          } else {
            next(); // Niet ingelogd, mag registreren
          }
        });
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue'),
      beforeEnter: (to, from, next) => {
        // Voorkomen dat ingelogde gebruikers de loginpagina bezoeken
        onAuthStateChanged(auth, (user) => {
          if (user) {
            next('/'); // Als ingelogd, doorsturen naar home
          } else {
            next(); // Niet ingelogd, mag inloggen
          }
        });
      }
    }
  ]
});

export default router;
