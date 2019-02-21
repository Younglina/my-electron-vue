<template>
  <div class="home">
    <div class="content">
      <menus v-show="showMenus"/>
      <div class="pages">
        <img :src="avatarUrl" class="background">
        <div class="topHeader">
          <div class="topCenter">
            <ul class="topRouter" @click="toRoute" v-show="showMenus">
              <li
                v-for="item in routers"
                :key="item.id"
                :data-v-url="item.url"
                :data-v-id="item.id"
                :class="{'active-li':actived==item.id}"
              >{{item.name}}</li>
            </ul>
            <div class="topAther">
              <span class="buttonSpan">
                <i class="el-icon-arrow-left" @click="back"></i>
              </span>
              <span class="buttonSpan">
                <i class="el-icon-arrow-right"></i>
              </span>
              <div class="topSearch">
                <i class="el-icon-search"></i>
                <input type="text" placeholder="搜索">
              </div>
              <span class="buttonSpan iconMenu">
                <i class="iconfont icon-caidan_o"></i>
              </span>
              <span class="buttonSpan">
                <i class="el-icon-message"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="pageContent">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div style="display:block;">
      <el-progress :show-text="false" status="exception" color="rgb(214, 58, 57)" :percentage="10"></el-progress>
    </div>
    <div class="playDiv">
      <div>
        <div>
          <audio :src="getMusicUrl" autoplay ref="myAudio"></audio>
          <img class="playImg" :src="getPlaying.al.picUrl">
        </div>
        <div class="playName">
          <div>{{getPlaying.name}}</div>
          <span>{{getPlaying.ar[0].name}}</span>
        </div>
      </div>
      <div class="playControl">
        <i class="iconfont icon-heart"></i>
        <i class="iconfont icon-icon--"></i>
        <span class="playDuration">00:00</span>
        <i class="iconfont icon-shangyishoushangyige"></i>
        <div class="iconCent">
          <i class="iconfont icon-bofang" @click="togglePlay"></i>
        </div>
        <i class="iconfont icon-xiayigexiayishou"></i>
        <span class="playDuration">{{duration}}</span>
      </div>
      <div style="align-items: center;margin-left:30px;">
        <i class="iconfont icon-icon-test2"></i>
      </div>
    </div>
  </div>
</template>

<script>
import menus from "./Menus.vue";
// import { lt } from "semver";
import { mapGetters } from "vuex";
export default {
  name: "landing-page",
  components: {
    menus
  },
  data() {
    return {
      hideLi: false,
      avatarUrl: "",
      routers: [
        { name: "个性推荐", url: "/page/findMusic/index/recommend", id: 1 },
        { name: "歌单", url: "/page/findMusic/index/musics", id: 2 },
        { name: "主播电台", url: "/page/findMusic/index/musics", id: 3 },
        { name: "排行榜", url: "/page/findMusic/index/rank", id: 4 },
        { name: "歌手", url: "/page/findMusic/index/rank", id: 5 },
        { name: "最新音乐", url: "/page/findMusic/index/newest", id: 6 }
      ],
      actived: 1,
      duration: 0,
      showMenus: true
    };
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    togglePlay() {
      this.$store.commit("setIsPlaying");
      this.$refs.myAudio.paused ? this.$refs.myAudio.play():this.$refs.myAudio.pause();
    },
    toRoute(e) {
      this.actived = e.target.dataset.vId;
      this.$router.push(e.target.dataset.vUrl);
    }
  },
  computed: {
    ...mapGetters(["getIsPlaying", "getPlaying", "getMusicUrl"])
  },
  watch: {
    getIsPlaying: function(a) {
      this.isPlaying = a;
    },
    getMusicUrl() {
      let temp = this.$refs.myAudio.duration;
      let tt = Math.floor(temp / 60);
      this.duration = `0${tt}:${String(temp - tt * 60).substr(0, 2)}`;
    },
    $route(to) {
      let temp = to.name === "info";
      temp
        ? (this.avatarUrl = this.$store.getters.getUserInfo.profile.avatarUrl)
        : "";
      this.showMenus = to.name != "playing";
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
}

.home,
.topCenter,
.pages {
  width: 100%;
}

.home,
.content,
.pages {
  height: 100%;
}
.home,
.pages {
  flex-direction: column;
}
.topHeader {
  width: 95vw;
}
.pages {
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  .background {
    position: absolute;
    width: 100%;
    height: 500px;
    z-index: -1;
    opacity: 0.6;
    filter: blur(30px);
  }
  .pageContent {
    overflow-y: auto;
    margin-top: 80px;
  }
}

.topHeader {
  padding: 20px 0;
  height: 60px;
  align-items: center;
  z-index: 100;
  position: fixed;
  -webkit-app-region: drag;
  .topCenter {
    align-items: center;
    .hideLi {
      background-color: white;
    }
    .topRouter {
      list-style: none;
      display: flex;
      font-size: 14px;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.7);
      padding: 0;
      justify-content: space-between;
      li {
        margin-right: 28px;
        padding-bottom: 20px;
        &:not(.active-li):hover {
          color: black;
        }
      }
      .active-li {
        color: red;
        border-bottom: 1px solid currentColor;
      }
    }
    .topAther {
      padding-bottom: 20px;
      align-items: center;
      flex-grow: 1;
      justify-content: flex-end;
      .buttonSpan {
        border-radius: 50%;
        padding: 3px 4px;
        margin: 0 5px;
        &:hover {
          background-color: #eeeef9;
        }
      }
    }
    .topSearch {
      width: 130px;
      align-items: center;
      border-radius: 50px;
      padding: 5px 10px;
      border-radius: 16px;
      background-color: ghostwhite;
      input {
        width: 110px;
        border: none;
        background-color: ghostwhite;
        outline: none;
      }
    }
    .btnGroups {
      i {
        font-size: 16px;
        font-weight: bold;
      }
    }
    .topRight {
      color: white;
      font-size: 22px;
      margin-right: 20px;
      i {
        font-weight: bold;
        padding-left: 30px;
      }
    }
  }
  .topUser {
    border-left: 1px solid;
    height: 100%;
    align-items: center;
    padding-left: 20px;
    width: 60px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
}

.playDiv {
  height: 65px;
  display: flex;
  justify-content: space-between;
  padding: 2px 10px;
  align-items: center;
  background-color: #f6f6f6;
  .playControl {
    align-items: center;
    & > i {
      font-size: 20px;
      color: black;
      border-radius: 50%;
      padding: 4px;
      margin-left: 20px;
    }
    .iconCent {
      font-size: 22px;
      padding: 6px;
      border: 1px solid currentColor;
      border-radius: 50%;
      margin-left: 20px;
    }
    .playDuration {
      margin-left: 20px;
      font-size: 12px;
    }
  }
}

.el-progress-bar__outer {
  background-color: #b0b0b0;
}
.playImg {
  width: 50px;
  height: 50px;
  border-radius: 5px;
}
.playName {
  flex-direction: column;
  font-size: 14px;
  margin-left: 10px;
  span {
    font-size: 13px;
    color: gray;
    margin-top: 5px;
  }
}
.sounds {
  width: 100px;
  display: block;
  margin-left: 5px;
  .el-progress-bar__outer {
    background-color: #dedede;
  }
}
</style>
