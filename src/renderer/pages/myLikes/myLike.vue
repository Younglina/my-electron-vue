<template>
  <div
    v-if="!loading"
    v-loading="loading"
    element-loading-text="加载中"
    class="myLike"
    element-loading-spinner="el-icon-loading"
    element-loading-background="white"
  >
    <div class="listTop" v-show='playlist'>
      <img :src="playlist.coverImgUrl" class="q-background">
      <div>
        <img :src="playlist.coverImgUrl" style="width:180px;height:180px;border-radius:5px;">
      </div>
      <div>
        <div class="listInfo">
          <div class="listInfoTop">
            <div style="display: flex;align-items: center;">
              <span class="listSpan">歌单</span>
              <span class="listName">{{playlist.name}}</span>
            </div>
          </div>
          <div style="display: flex;align-items: center;padding:10px 0;">
            <img :src="playlist.creator.avatarUrl" style="width:30px;height:30px;border-radius:50%">
            <span class="creatorName">{{playlist.creator.nickname}}</span>
            <span class="createTime">{{new Date(playlist.createTime).toLocaleDateString()}}创建</span>
          </div>
          <div style="display: flex;margin-top:20px;">
            <el-button-group style="margin-right:10px">
              <el-button size="mini" round>
                <i class="iconfont icon-play-circle"></i>
                <span class="btnSpan">播放全部</span>
              </el-button>
              <el-button size="small" round>
                <i class="el-icon-plus"></i>
              </el-button>
            </el-button-group>
            <el-button size="mini" round>
              <i class="iconfont icon-star"></i>
              <span class="btnSpan">收藏(0)</span>
            </el-button>
            <el-button size="mini" round>
              <i class="iconfont icon-share"></i>
              <span class="btnSpan">分享(0)</span>
            </el-button>
            <el-button size="mini" round>
              <i class="iconfont icon-plus-download"></i>
              <span class="btnSpan">下载全部</span>
            </el-button>
          </div>
          <div class="listCount">
            <div>
              <span class="fontC">标签:</span>
              <span class="fontP" v-for="item in playlist.tags" :key="item">{{item}}</span>
            </div>
            <div>
              <span class="fontC">歌曲数:</span>
              <span class="fontP">{{playlist.trackCount}}</span>
              <span class="fontC">收听数:</span>
              <span class="fontP">{{playlist.playCount}}</span>
            </div>
            <div>
              <span class="fontC">简介:</span>
              <span class="fontP" v-if="playlist.description">{{playlist.description}}</span>
              <span class="fontP" v-else>添加简介</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="listBanTitle">
        <span class="listBanAct listBan">歌曲列表</span>
        <span class="listBan">评论</span>
        <span class="listBan">收藏者</span>
      </div>
      <div class="songList">
        <table cellspacing="0">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
          </thead>
          <tbody>
            <tr v-for="(item,index) in playlist.tracks" :key="item.id" @dblclick="handleClick(item.id)">
              <td class="indexTd">{{String(index+1).padStart(2,0)}}</td>
              <td class="secTd">
                <i class="iconfont icon-zan1"></i>
                <i class="iconfont icon-plus-download"></i>
              </td>
              <td class="musicName">
                <div class="musicName"> 
                  {{item.name}}
                  <span v-if="item.alia.length>0" style="color:gray">({{item.alia[0]}})</span>
                </div>
              </td>
              <td class="musicActName"><div>{{item.ar[0].name}}</div></td>
              <!-- <td>{{item.al.name}}</td> -->
              <td class="musicAlName"><div>{{item.al.name}}</div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      loading: true,
      playlist: ""
    };
  },
  watch: {
    $route(to, from) {
      this.fetchDate();
    }
  },
  mounted() {
    this.fetchDate();
  },
  methods: {
    fetchDate() {
      this.$http
        .get(
          "http://47.100.49.193:3000/playlist/detail?id=" + this.$route.query.id
        )
        .then(res => {
          this.playlist = res.data.playlist;
          this.loading = false;
        });
    },
    handleClick(e) {
      this.$router.push({ path: "/page/playing", query: { id: e } });
    }
  }
};
</script>

<style lang='scss' scoped>
$myred: rgb(185, 37, 0);
.el-button {
  background: rgba(255, 255, 255, 0.42);
}
.el-button-group > .el-button {
  background: red;
  color: white;
}
.myLike {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: block;
}

.listTop {
  display: flex;
  width: 750px;
  height: 200px;
  padding: 25px 0;
  position: relative;
  .q-background {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.4;
    filter: blur(20px);
  }
}

.listInfo {
  padding-left: 30px;
}

.listInfoTop {
  display: flex;
  justify-content: space-between;
  width: 540px;
}

.listName {
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
}

.listCount {
  display: flex;
  flex-direction: column;
  > div {
    margin: 5px 0;
  }
}

.fontC,
.fontP {
  font-size: 12px;
}

.fontP {
  margin-right: 10px;
}

.fontS {
  font-size: 34px;
  color: #7c7c7c;
  padding: 0 5px;
}

.listSpan {
  background-color: rgb(193, 9, 7);
  color: white;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bolder;
  padding: 2px 8px;
}

.creatorName {
  font-size: 12px;
  margin: 0 5px;
}

.createTime {
  font-size: 12px;
  color: #7c7c7c;
}

.listBanTitle {
}

.listBan {
  padding: 10px 0;
  margin-right: 20px;
  font-size: 14px;
}

.listBanAct {
  color: $myred;
  border-bottom: 2px solid currentColor;
}

.btnSpan {
  font-size: 14px;
  margin-left: 3px;
}

.el-button--mini {
  padding: 7px 10px;
}

.songList {
  border-top: 1px solid gainsboro;
  margin-top: 8px;
  table {
    font-size: 12px;
    width: 100%;
  }
  th {
    text-align: left;
    color: #7c7c7c;
    // border: 1px solid #d4d4d4 {
    //   top: 0;
    //   right: 0;
    // }
    padding: 5px 10px;
  }
  tr {
      line-height: 20px;
    &:nth-child(odd) {
      background-color: #f4f4f4;
    }
    .indexTd {
      text-align: right;
      width: 30px;
      padding-right: 5px;
    }
    .secTd {
      width: 50px;
    }
    .musicName {
      width: 220px;
    }
    .musicActName {
      width: 80px;
    }
    .musicAlName {
      width: 230px;
    }
    td >div{
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    &:hover {
      background-color: #d4d4d4;
    }
  }
  td {
    padding: 5px 10px;
  }
  .icon-zan1 {
    color: rgb(217, 22, 23);
  }
  .icon-plus-download {
    color: #b6b6b6;
    margin-left: 5px;
  }
}
</style>