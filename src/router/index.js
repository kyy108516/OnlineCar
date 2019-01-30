import Vue from 'vue'
import Router from 'vue-router'
import login from '../page/login/login'
import home from "@/page/home/home"
import carlist from "@/page/car/carlist"
import layout from "@/page/Layout"
import cartype from "@/page/car/cartype"
import addcar from "@/page/car/addcar"
import cardetail from "@/page/car/cardetail"
import addcartype from "@/page/car/addcartype"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/login',
      component: login
    },
    {
      path:'/home',
      component:layout,
      children:[{
        path:'',
        component:home
      }]
    },
    {
      path:"/car",
      component:layout,
      children: [{
        path:'carlist',
        component:carlist
      },
        {
          path:'cartype',
          component:cartype
        },
        {
          path:'addcar/:id',
          component:addcar
        },
        {
          path:'cardetail',
          component:cardetail
        },
        {
          path:'addcartype/:id',
          component:addcartype
        },
      ]
    }
  ]
})
