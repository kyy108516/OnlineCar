import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

const state = {
  insurance: 2,
  contract: 0,
  violation: 0,
  accident: 0,
  data: [
    {
      path: '/home',
      name: '首页'
    },
    {
      name: '系统组件',
      child: [
        {
          name: '介绍',
          path: '/components'
        },
        {
          name: '功能类',
          child: [
            {
              path: '/components/permission',
              name: '详细鉴权'
            },
            {
              path: '/components/pageTable',
              name: '表格分页'
            }
          ]
        }
      ]
    }
  ],
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
  }
};


export default new vuex.Store({
  state,
  mutations,
  actions
})
