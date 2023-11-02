import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import NewsView from '../views/News.vue'
import Product from '../views/Product.vue'
import New from '../views/New.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/news',
    name: 'news',
    component: NewsView 
  },
  {
    path: '/product',
    name: 'product',
    component: Product
  },
  {
    path:'/news/:id',
    name:'new',
    component:New
  }
 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to,form,next)=>{
  NProgress.start();
  next()
})
router.afterEach((to,form,next)=>{
  NProgress.done();
})
export default router
