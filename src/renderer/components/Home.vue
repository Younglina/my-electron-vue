<template>
  <div class="home">
    <div class="topHeader">
      <div class="iconClo"><i class="iconfont icon-cloud"></i>网易云音乐</div>
      <div class="topCenter">
        <div>
          <div class="btnGroups">
            <button class="btnPre"><i class="el-icon-arrow-left"></i></button>
            <button class="btnNext"><i class="el-icon-arrow-right"></i></button>
          </div>
          <div class="topSearch">
              <i class="el-icon-search"></i>
              <input type="text" placeholder="搜索音乐，歌手，歌词，用户"/>
          </div>
        </div>
          <div class="topRight">
          <i class="el-icon-message"></i>
          <i class="el-icon-setting"></i>
        </div>
      </div>
      <div class="topUser">
        <img src="../assets/head.jpeg" alt="">
      </div>
    </div>
    <div class="content">
      <menus />
      <div class="pages">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import menus from "./Menus.vue";
export default {
  name: "landing-page",
  components: { menus },
  methods: {}
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
}
.home,
.topHeader,
.topHeader,
.topCenter,
.content,
.pages {
  width: 100%;
}
.home,
.content,
.pages{
  height: 100%;
  flex: 1;
}
.home {
  flex-direction: column;
}
.topHeader {
  padding: 2px 5px;
  height: 60px;
  align-items: center;
  background-color: red;
  .iconClo {
    color: white;
    width: 200px;
    font-weight: bolder;
    i {
      font-size: 22px;
      margin: 0 10px;
    }
  }
  .topCenter {
    flex: 1;
    padding-left: 20px;
    justify-content: space-between;
    .topSearch {
      width: 210px;
      margin-left: 10px;
      padding-left: 20px;
      align-items: center;
      border-radius: 50px;
      border: 1px solid white;
      background-color: white;
      padding: 5px 10px;
      i {
        color: gainsboro;
      }
      input {
        width: 180px;
        border: none;
      }
    }
    .btnGroups {
      .btnPre, .btnNext {
        background-color: red;
        color: white;
        border:none;
        i {
        font-size: 16px;
        font-weight: bold;
        }
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
</style>
