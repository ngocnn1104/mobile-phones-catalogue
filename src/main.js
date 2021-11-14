import Vue from 'vue'
import axios from './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

Vue.config.productionTip = false;
Vue.prototype.$api = axios;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
