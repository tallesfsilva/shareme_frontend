import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from '../container/Home.vue'
import Login from '../components/Login.vue'
import CreatePin from '../components/CreatePin.vue'
import Feed from '../components/Feed.vue'
import Pins from '../container/Pins.vue'
import PinDetail from '../components/PinDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
       
          path: '/',          
          component: Home,        
          children:[{
            path: '/',
            component: Pins,
            children:[{
              path:'create-pin',
              component: CreatePin,
            },
            {
              path:'/',
              component: Feed,
         
              alias: 'feed'
            },
            {
              path:'pin-detail/:id',
              component: PinDetail,
              name: 'pin-detail'
            }
          ]
          }]    
          
         


      
    },

   

    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
