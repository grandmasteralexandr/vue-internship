import Vue from 'vue'
import Vuex from 'vuex'
import {TaskStore} from './modules/TaskStore'
import {ActivityStore} from './modules/ActivityStore'
import {extractVuexModule} from "vuex-class-component";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ...extractVuexModule(TaskStore),
    ...extractVuexModule(ActivityStore)
  }
})
