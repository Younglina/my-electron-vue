<template>
  <div class="home">
    <div class="content">
      <menus/>
      <div class="pages">
        <img :src="avatarUrl" class="background">
        <div class="topHeader">
          <div class="topCenter">
            <ul :class="[hideLi?'hideLi':'','topRouter']">
              <li class="active-li">个性推荐</li>
              <li>歌单</li>
              <li>主播电台</li>
              <li>排行榜</li>
              <li>歌手</li>
              <li>最新音乐</li>
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
        <div class='pageContent'>
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div class="playDiv">
      <div class="playControl">
        <i class="iconfont icon-shangyishou"></i>
        <i class="iconfont icon-zanting iconCent" @click="togglePlay"></i>
        <i class="iconfont icon-shangyishou1"></i>
      </div>
      <div style="display:block; width:410px;margin-left: 70px;">
        <el-progress
          :show-text="false"
          status="exception"
          color="rgb(214, 58, 57)"
          :percentage="10"
        ></el-progress>
      </div>
      <div style="align-items: center;margin-left:30px;">
        <i class="iconfont icon-icon-test2"></i>
        <div class="sounds">
          <el-progress
            :show-text="false"
            status="exception"
            color="rgb(214, 58, 57)"
            :percentage="10"
          ></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menus from "./Menus.vue";
import { lt } from "semver";
export default {
  name: "landing-page",
  components: {
    menus
  },
  data() {
    return {
      hideLi: false,
      avatarUrl: ""
    };
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    togglePlay() {
      this.$store.commit("setIsPlaying");
    }
  },
  watch: {
    $route(to) {
      let temp = to.name === "info";
      // this.hideLi = temp;
      temp
        ? (this.avatarUrl = this.$store.getters.getUserInfo.profile.avatarUrl)
        : "";
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
}

.home,
.topHeader,
.topCenter,
.content,
.pages {
  width: 100%;
}

.home,
.content,
.pages {
  height: 100%;
  flex: 1;
}
.home,
.pages {
  flex-direction: column;
}
.pages {
  padding-left: 30px;
  padding-right: 10px;
  position: relative;
  .background {
    position: absolute;
    width: 100%;
    height: 500px;
    z-index: -1;
    opacity: 0.6;
    filter: blur(30px);
  }
  .pageContent{
    overflow-y: auto;
  }
}
.topHeader {
  padding: 20px 0;
  height: 60px;
  align-items: center;
  z-index: 100;
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
        z-index: -1;
        &:hover {
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
      justify-content: space-between;
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
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #f6f6f6;
  .playControl {
    align-items: center;
    i {
      font-size: 20px;
      color: white;
      background-color: rgb(214, 58, 57);
      border-radius: 50%;
      padding: 4px;
      margin-left: 20px;
    }
    .iconCent {
      font-size: 22px;
      padding: 6px;
    }
  }
}

.el-progress-bar__outer {
  background-color: #b0b0b0;
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
