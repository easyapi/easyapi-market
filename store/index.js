import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import team from './modules/team'
import getters from './getters'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    user,
    team
  },
  state: {
    counter: 0
  },
  mutations: {},
  actions: {},
  getters

})

export default store
