import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

const state = {
  token: window.sessionStorage.getItem('token'),
  username: ""
};

const mutations = {
  LOGIN: (state, data) => {
    state.token = data;
    window.sessionStorage.removeItem('token');
  },
  LOGOUT: (state) => {
    state.token = null;
    window.sessionStorage.removeItem('token');
  },
  USERNAME: (state, data) => {
    state.username=data;
    window.sessionStorage.setItem('username',data);
  }
};

const actions={
  UserLogin({commit},data){
    commit('LOGIN',data);
  },
  UserLogout({commit}){
    commit('LOGOUT');
  },
  UserName({commit},data){
    commit('USERNAME',data);
  }
};


export default new vuex.Store({
  state,
  mutations,
  actions
})
