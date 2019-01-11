import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store/index'
import common from './css/common.css'

var url="http://localhost:3000"
axios.get(url+'/users')
  .then(function (response) {
  console.log(response);
})
  .catch(function (error) {
    console.log(error)
  })
Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
