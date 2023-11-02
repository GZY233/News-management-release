import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainBox from '../views/MainBox.vue'
import RoutesConfig from './config'
import store from '@/store/index'
const routes = [
{
  path:"/login",
  name:"login",
  component:Login
},
{
  path:"/mainbox",
  name:"mainbox",
  component:MainBox
},
// {
//   path:'/:pathMatch(.*)*',
//   name:"notefound",
//   component:NoteFound
// }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.name==="login"){
    next()
  }else{
    if(!localStorage.getItem("token")){
      // next({
      //     path:"/login"
      //   })
      router.push("/login")
      next()
    }
    else{
      if(!store.state.isGetterRouter){
        router.removeRoute("mainbox")
      Configrouter()
      next({path:to.fullPath})
      }else{
        next()
      }
       }
  }
})
const Configrouter = ()=>{
 
    router.addRoute({
      path:"/mainbox",
      name:"mainbox",
      component:MainBox
    })
  
RoutesConfig.forEach(item=>{
  if (mSession(item)) {
    router.addRoute("mainbox",item)
  }
  
})
store.commit("changeGetterRouter",true)
}
const mSession = (item)=>{
if (item.auth) {
  return store.state.userIfno.role===1
}
return true
}
export default router
