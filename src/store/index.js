import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

const state = {
  func:{
    insurance: 2,
    contract: 0,
    violation: 0,
    accident: 0,
  },
};

const mutations = {
  updateInsurance(state,n){
    state.func.insurance=n
  },
  updateContract(state,n){
    state.func.contract=n
  },
  updateViolation(state,n){
    state.func.violation=n
  },
  updateAccident(state,n){
    state.func.accident=n
  },
};

const actions={
  updateInsurance({commit}) {
    commit('updateInsurance')
  },
  updateContract({commit}) {
    commit('updateContract')
  },
  updateViolation({commit}) {
    commit('updateViolation')
  },
  updateAccident({commit}) {
    commit('updateAccident')
  }
};


export default new vuex.Store({
  state,
  mutations,
  actions
})
