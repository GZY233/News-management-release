import Center from '../views/center/Center.vue'
import Home from '../views/home/Home.vue'
import NewsList from "../views/news-manage/NewsList.vue"
import NewsAdd from "../views/news-manage/NewsAdd.vue"
import ProductAdd from "../views/product-manage/ProductAdd.vue"
import ProductList from "../views/product-manage/ProductList.vue"
import UserAdd from "../views/user-manage/UserAdd.vue"
import UserList from "../views/user-manage/UserList.vue"
import NoteFound from "../views/notefound/NoteFound.vue"
import NewsEdit from "../views/news-manage/NewsEdit.vue"
import ProductEdit from "../views/product-manage/ProductEdit.vue"

const routes = [
    {
      path:"/center",
      name:"center",
      component:Center
    },
    {
      path:"/index",
      name:"home",
      component:Home
    },
    {
      path:"/news-manage/newslist",
      component:NewsList
    },
    {
      path:"/news-manage/newsadd",
      component:NewsAdd
    },
    {
      path:"/product-manage/productadd",
      component:ProductAdd
    },
    {
      path:"/product-manage/productlist",
      component:ProductList
    },
    {
      path:"/user-manage/useradd",
      component:UserAdd,
      auth:true
    },
    {
      path:"/user-manage/userlist",
      component:UserList,
      auth:true
    },
    {
      path:"/",
      redirect:"/index"
    },    
    {
      path:'/:pathMatch(.*)*',
      name:"notefound",
      component:NoteFound
    },
    {
      path:'/news-manage/newsedit/:id',
      component:NewsEdit
    },
    {
      path:'/product-manage/ProductEdit/:id',
      component:ProductEdit
    }
    ]

    export default routes
    