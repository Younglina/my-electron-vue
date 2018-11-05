import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    userPlayList:[]
  },
  mutations:{
    setUserPlayList:(state, data) => {
      console.log('setUserPlayList')
      state.userPlayList = data
    }
  },
  getters: {
    getUserPlayList: (state) => {
      return state.userPlayList
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
