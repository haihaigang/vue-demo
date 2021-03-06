import '../assets/sass/rby.scss';

// import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import store from './store'
import { getCoupons } from './store/actions'

Vue.config.debug = true

Vue.filter('time', timestamp => {
  return new Date(timestamp).toLocaleTimeString()
})

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

getCoupons(store)
