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
            <input type="text" placeholder="搜索音乐，歌手，歌词，用户" />
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
    <div class="playDiv">
      <div class="playControl">
        <i class="iconfont icon-shangyishou"></i>
        <i class="iconfont icon-zanting iconCent"></i>
        <i class="iconfont icon-shangyishou1"></i>
      </div>
      <div style="display:block; width:410px;margin-left: 70px;">
        <el-progress :show-text="false" status="exception" color="rgb(214, 58, 57)" :percentage="10"></el-progress>
      </div>
      <div style="align-items: center;margin-left:30px;">
        <i class="iconfont icon-icon-test2"></i>
        <div class="sounds">
          <el-progress :show-text="false" status="exception" color="rgb(214, 58, 57)" :percentage="10"></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import menus from "./Menus.vue";
  export default {
    name: "landing-page",
    components: {
      menus
    },
    created() {
  
    },
    methods: {}
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
  
  .home {
    flex-direction: column;
  }
  
  .topHeader {
    padding: 2px 5px;
    height: 60px;
    align-items: center;
    background-color: rgb(168, 19, 3);
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
        .btnPre {
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
        .btnNext {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
        .btnPre,
        .btnNext {
          background-color: rgb(168, 19, 3);
          border: 1px solid rgb(137, 7, 3);
          color: rgb(187, 66, 45);
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
