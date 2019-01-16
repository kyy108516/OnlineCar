import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

const state = {
  currpage_cartype:1,
};

const mutations = {
  update(state,currpage){
    state.currpage_cartype=currpage
  }
};

const actions={
  update({commit}) {
    commit('update')
  }
};


export default new vuex.Store({
  state,
  mutations,
  actions
})
