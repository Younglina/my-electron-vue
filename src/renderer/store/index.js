import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    userPlayList:[],
    isPlaying:false,
    userInfo:{}
  },
  mutations:{
    setUserPlayList:(state, data) => {
      console.log('setUserPlayList')
      state.userPlayList = data
    },
    setIsPlaying:(state)=>{
      console.log('setIsPlaying')
      state.isPlaying = !state.isPlaying
    },
    setUserInfo:(state,data)=>{
      state.userInfo = data;
    }
  },
  getters: {
    getUserPlayList: (state) => {
      return state.userPlayList
    },
    getIsPlaying: (state) =>{
      return state.isPlaying
    },
    getUserInfo:(state)=>{
      return state.userInfo
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
