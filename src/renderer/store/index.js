import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    userPlayList:[],
    isPlaying:true,
    userInfo:{},
    musicUrl:'',
    playing:{
      al:{
        picUrl:''
      },
      name:'未播放',
      ar:[{name:''}]
    },
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
    setPlaying:(state,data)=>{
      console.log('setPlaying')
      state.playing = data
    },
    setUserInfo:(state,data)=>{
      state.userInfo = data;
    },
    setMusicUrl:(state,data)=>{
      state.musicUrl = data;
    }
  },
  getters: {
    getUserPlayList: (state) => {
      return state.userPlayList
    },
    getIsPlaying: (state) =>{
      return state.isPlaying
    },
    getPlaying: (state) =>{
      return state.playing
    },
    getUserInfo:(state)=>{
      return state.userInfo
    },
    getMusicUrl:(state)=>{
      return state.musicUrl
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
