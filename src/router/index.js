import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Create from "../views/Create.vue";
import ViewWorkout from "../views/ViewWorkout.vue";
import {supabase} from '../supabase/init'


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{
      title:'Anasayfa',
      auth:false
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta:{
      title:'Giriş',
      auth:false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta:{
      title:'Üye Ol',
      auth:false
    }
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    meta:{
      title:'Oluştur',
      auth:true
    }
  },
  {
    path: "/view/:id",
    name: "View",
    component: ViewWorkout,
    meta:{
      title:'Görüntüle',
      auth:false
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to,from,next)=>{

  document.title=`${to.meta.title} | AOS Workout`
  next()
})

router.beforeEach((to,from,next)=>{
  const user=supabase.auth.user();

  if(to.matched.some((res)=>res.meta.auth)){
    if(user){
      next()
      return
    }
    next({name:'Login'})
    return
  }

  next()
})




export default router;
