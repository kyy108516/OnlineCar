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
import driverlist from "@/page/driver/driverlist"
import adddriver from "@/page/driver/adddriver"
import driverdetail from "@/page/driver/driverdetail"
import contractlist from "@/page/contract/contractlist"
import addcontract from "@/page/contract/addcontract"
import contractdetail from "@/page/contract/contractdetail"
import carchecklist from "@/page/contract/carchecklist"
import carvalidate from "@/page/contract/carvalidate"
import settlementlist from "@/page/contract/settlementlist"
import accidentlist from "@/page/operate/accidentlist"
import detainlist from "@/page/operate/detainlist"
import maintainancelist from "@/page/operate/maintainancelist"
import addmaintainance from "@/page/operate/addmaintainance"
import insuranceremind from "@/page/operate/insuranceremind"
import contractremind from "@/page/operate/contractremind"
import violationlist from "@/page/operate/violationlist"
import billlist from "@/page/account/billlist"
import detaillist from "@/page/account/detaillist"
import practicallist from "@/page/account/practicallist"
import receivablelist from "@/page/account/receivablelist"
import functionset from "@/page/system/functionset"
import info from "@/page/system/info"
import partnerlist from "@/page/system/partnerlist"
import rolelist from "@/page/system/rolelist"
import userlist from "@/page/system/userlist"
import settlementdetail from "@/page/contract/settlementdetail"
import addinsurance from  "@/page/car/addinsurance"
import addpartner from "@/page/system/addpartner"
import addaccident from "@/page/operate/addaccident"
import addviolation from "@/page/operate/addviolation"
import accidentdetail from "@/page/operate/accidentdetail"
import financecheck from "@/page/contract/financecheck"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      component: layout,
      children: [{
        path: '',
        component: home
      }]
    },
    { //车辆列表路由
      path: "/car",
      component: layout,
      children: [{
        path: 'carlist',
        component: carlist
      },
        {
          path: 'cartype',
          component: cartype
        },
        {
          path: 'addcar/:id',
          component: addcar
        },
        {
          path: 'cardetail/:id',
          component: cardetail
        },
        {
          path: 'cardetail/addinsurance/:id',
          component: addinsurance
        },
        {
          path: 'addcartype/:id',
          component: addcartype
        },
      ]
    },
    { //司机列表路由
      path: "/driver",
      component: layout,
      children: [{
        path: 'driverlist',
        component: driverlist
      },
        {
          path: 'adddriver/:id',
          component: adddriver
        },
        {
          path: 'driverdetail/:id',
          component: driverdetail
        }
        ],
    },
    { //合同列表路由
      path: "/contract",
      component: layout,
      children: [{
        path: 'contractlist',
        component: contractlist
      },
        {
          path: 'addcontract/:id',
          component: addcontract
        },
        {
          path: 'contractdetail/:id',
          component: contractdetail
        },
        {
          path: 'financecheck/:id',
          component: financecheck
        },
        {
          path: 'carchecklist',
          component: carchecklist
        },
        {
          path: 'carvalidate/:id',
          component: carvalidate
        },
        {
          path: 'settlementlist',
          component: settlementlist
        },
        {
          path: 'settlementdetail/:id',
          component: settlementdetail
        },
      ],
    },
    { //运营管理路由
      path: "/operate",
      component: layout,
      children: [{
        path: 'accidentlist',
        component: accidentlist
      },
        {
          path: 'addaccident/:id',
          component: addaccident
        },
        {
          path: 'accidentdetail/:id',
          component: accidentdetail
        },
        {
          path: 'detainlist',
          component: detainlist
        },
        {
          path: 'maintainancelist',
          component: maintainancelist
        },
        {
          path: 'addmaintainance/:id',
          component: addmaintainance
        },
        {
          path: 'insuranceremind',
          component: insuranceremind
        },
        {
          path: 'contractremind',
          component: contractremind
        },
        {
          path: 'violationlist',
          component: violationlist
        },
        {
          path: 'addviolation',
          component: addviolation
        },
      ],
    },
    { //财务管理路由
      path: "/account",
      component: layout,
      children: [{
        path: 'billlist',
        component: billlist
      },
        {
          path: 'detaillist',
          component: detaillist
        },
        {
          path: 'practicallist',
          component: practicallist
        },
        {
          path: 'receivablelist',
          component: receivablelist
        },
      ],
    },
    { //用户中心路由
      path: "/system",
      component: layout,
      children: [{
        path: 'functionset',
        component: functionset
      },
        {
          path: 'info',
          component: info
        },
        {
          path: 'partnerlist',
          component: partnerlist
        },
        {
          path: 'addpartner/:id',
          component: addpartner
        },
        {
          path: 'rolelist',
          component: rolelist
        },
        {
          path: 'userlist',
          component: userlist
        },
      ],
    }
  ]
})
