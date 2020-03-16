import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
  config: { id: "UA-160763913-1" }
});

library.add(faAngleDoubleLeft, faAngleDoubleRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
