import { createStore } from 'vuex'

import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    isGetterRouter:false,
    isCollapsed:false,
    userIfno:{

    }
  },
  getters: {
  },
  mutations: {
    changeGetterRouter(state,value){
      state.isGetterRouter=value
    },
    changeCollapsed(state){
      state.isCollapsed =!state.isCollapsed
    },
    changeUserInfo(state,value){
      state.userIfno={
        ...state.userIfno,
        ...value
      }
    },
    clearUserInfo(state,value){
      state.userIfno = {}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[createPersistedState({
    paths:["isCollapsed","userIfno"]
  })]
})
