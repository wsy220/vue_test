// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import router from './router'
// import HelloWorld from './components/HelloWorld'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    currentRoute: window.location.href
  },
  components: {
    ViewComponent () {
      return router.routes[this.currentRoute] || 'NotFound'
    }
  },
  render: h => { return h(this.ViewComponent) }
  // components: { HelloWorld },
  // template: '<HelloWorld/>',
  // render: h => h(HelloWorld)
})
