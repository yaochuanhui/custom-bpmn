import Vue from 'vue'
import Vuex from 'vuex'
import {getToolData} from '../api/flowChart'

Vue.use(Vuex)

const state = {
  toolData: null
}
const mutations = {
  upDateToolData (state, value) {
    state.toolData = value
  }
}
const actions = {
  queryToolData ({ commit, state }) {
    getToolData().then(data => {
      commit('upDateToolData', data.data)
    })
  }
}
const getters = {
  toolData (state, getters) {
    return state.toolData
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
