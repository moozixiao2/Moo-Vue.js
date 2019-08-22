import Vue from 'vue'
import App from './App.vue'
import router from '@/utils/router.js'
import '@/styles/animate.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
