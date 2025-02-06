import { createRouter, createWebHistory } from 'vue-router';

import CoachDetails from './pages/coaches/CoachDetails.vue'
import CoachList from './pages/coaches/CoachesList.vue'
import CoachRegistration from './pages/coaches/CoachesRegister.vue'
import ContactCoach from './pages/requests/ContactCoach.vue'
import RequestsReceived from './pages/requests/RequestReceived.vue'
import NotFound from './pages/NotFound.vue'



const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachList },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      children: [
        { path: 'contact', component: ContactCoach }, //coaches/c1/contact
      ],
    },
    { path: '/register', component: CoachRegistration },
    { path: '/request', component: RequestsReceived },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
