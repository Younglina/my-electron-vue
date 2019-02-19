<template>
  <div v-cloak>
    <div class="highRec">
      <img :src="highquality.coverImgUrl" class="q-background">
      <div class="q-bigHead" :style="{'backgroundImage':'url('+highquality.coverImgUrl+')'}"></div>
      <div class="q-info">
        <span class="q-title">
          <i class="iconfont icon-huangguan"></i>精品歌单
        </span>
        <span class="q-name">{{highquality.name}}</span>
        <div class="q-desc">{{highquality.copywriter}}</div>
      </div>
    </div>

    <div style="margin:30px 20px 0 30px;text-align: right; ">
      <span class="labels labelItem" v-for="item in hotLabel" :key="item.id">{{item.name}}</span>
    </div>

    <div class="musicCont">
      <div v-for="item in recommendResource" :key="item.id" class="musicDiv">
        <div class="playDiv">
          <div class="playCount">
            <i class="iconfont icon-erji"></i>
            <span>{{item.playCount}}</span>
          </div>
          <img class="musicPic" :src="item.picUrl" alt>
        </div>
        <span class="musicName">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "musicpage",
  data() {
    return {
      musicType: "",
      hotLabel: [],
      recommendResource: [],
      highquality: {}
    };
  },
  created() {
    let api = this.$http;
    let self = this;
    api.get(this.$api + "/top/playlist/highquality?limit=1").then(res => {
      this.highquality = res.data.playlists[0];
    });
    api.get(this.$api + "/playlist/hot").then(res => {
      self.hotLabel = res.data.tags;
    });
    api.get(this.$api + "/personalized").then(res => {
      self.recommendResource = res.data.result.slice(0, 20).map(item => {
        item.playCount = parseInt(item.playCount / 10000) + "万";
        return item;
      });
    });
  }
};
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}

.labels {
  display: inline-block;
  font-size: 12px;
}

.labelItem {
  padding: 0 10px;
  border-left: 1px solid whitesmoke;
  &:nth-child(1){
      padding: 0;
      border: none;
  }
}
.highRec {
  position: relative;
  display: flex;
  border-radius: 5px;
  padding: 10px 0;
  .q-bigHead {
    width: 150px;
    height: 150px;
    border-radius: 5px;
    margin-left: 10px;
    background-size: cover;
    cursor: pointer;
  }
  .q-background {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(30px);
  }
  .q-info {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    .q-title {
      margin: 20px 0;
      font-size: 12px;
      color: rgb(228, 169, 89);
      width: 100px;
      padding: 3px;
      border-radius: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border: 1px solid currentColor;
      i {
        font-size: 14px;
        margin-right: 5px;
      }
    }
    .q-name {
      color: white;
      font-size: 16px;
    }
    .q-desc {
      color: gray;
      font-size: 12px;
      margin: 10px 0;
    }
  }
}
.musicCont {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .musicDiv {
    display: flex;
    flex-direction: column;
    margin: 20px 10px 20px 0;
    .playDiv {
      position: relative;
      .playCount {
        position: absolute;
        font-size: 12px;
        right: 0;
        padding-right: 5px;
        padding-top: 2px;
        color: white;
        font-weight: bolder;
        background-color: rgba(169, 169, 169, 0.35);
      }
      .musicPic {
        width: 180px;
        height: 180px;
        border-radius: 5px;
      }
    }
    .musicName {
      width: 150px;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
