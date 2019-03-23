import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

const state = {
  insurance: 2,
  contract: 0,
  violation: 0,
  accident: 0,
  array: [{
    "id": 1,
    "name": "车辆管理",
    "parent_id": 0,
    "url": "",
    "children": [
      {"id": 11, "name": "车辆列表", "parent_id": 1, "url": "/car/carlist"},
      {
        "id": 12,
        "name": "车型管理",
        "parent_id": 1,
        "url": "/car/cartype"
      }]
  }, {
    "id": 2,
    "name": "司机管理",
    "parent_id": 0,
    "url": "",
    "children": [{"id": 21, "name": "司机列表", "parent_id": 2, "url": "/driver/driverlist"}]
  }]
};

const mutations = {
  updateInsurance(state, n) {
    state.insurance = n
  },
  updateContract(state, n) {
    state.contract = n
  },
  updateViolation(state, n) {
    state.violation = n
  },
  updateAccident(state, n) {
    state.accident = n
  },
  updateArray(state,n){
    state.array=n
  }
};

const actions = {
  updateInsurance({commit}, n) {
    commit('updateInsurance', n)
  },
  updateContract({commit}, n) {
    commit('updateContract', n)
  },
  updateViolation({commit}, n) {
    commit('updateViolation', n)
  },
  updateAccident({commit, n}) {
    commit('updateAccident', n)
  },
  updateArray({commit}, n) {
    commit('updateArray', n)
  },
};


export default new vuex.Store({
  state,
  mutations,
  actions
})
