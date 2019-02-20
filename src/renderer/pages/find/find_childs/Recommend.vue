<template>
  <div
    v-loading="loading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="white"
    class="recommend"
  >
    <el-carousel :interval="4000" type="card" height="170px" class="recCar">
      <el-carousel-item v-for="item in mvFirst" :key="item.id" class="bannerItem">
        <!-- <img class="mvImg" :src="item.imageUrl" alt> -->
        <div class="bannerImg" :style="{'backgroundImage':'url('+item.imageUrl+')'}">
          <span class="bannerTitle">{{item.typeTitle}}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div>
      <span class="title">推荐歌单</span>
      <div class="musicCont">
        <div v-for="item in recommendResource" :key="item.id" class="musicDiv">
          <img v-if="item.picUrl" class="musicPic" :src="item.picUrl" alt>
          <div v-else class="musicPic">
            <span class="dateDay">{{new Date().getDate()}}</span>
            <i :class="item.icon"></i>
          </div>
          <div v-if="item.playCount" class="playCount">
            <i class="iconfont icon-erji"></i>
            <span>{{item.playCount}}</span>
          </div>
          <span class="musicName">{{item.name}}</span>
        </div>
      </div>
    </div>
    <!-- <div style="margin-top:30px;">
        <span class="title">个性化推荐</span>
        <span class="innerTitle">根据你的口味生成，播放和收藏越多，推荐越准</span>
        <hr class="titleHr"/>
        <div class="musicCont">
            <div class="perRecomd" v-for="item in recommend" :key="item.id">
                <div class="dayDiv">
                    <img class="daydate" :src="item.picUrl" :alt="item.picUrl"/>
                </div>
                <div class="perRight" >
                    <h4>{{item.name}}</h4>
                    <span class="preSpan">{{item.copywriter}}</span>
                </div>
            </div>
        </div>
    </div>-->
    <div style="margin-top:30px;">
      <div class="title">最新音乐</div>
      <div class="newDiv">
        <div v-for="(item,index) in personalizedNewsong" :key="item.id" class="newItems">
          <img class="newImg" :src="item.album.blurPicUrl">
          <span class="newIndex">{{String(index+1).padStart(2,0)}}</span>
          <div>
          <div class="newName">{{item.name}}</div>
          <div class="newArtName">{{item.artists[0].name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "recommend",
  data() {
    return {
      mvFirst: [],
      personalizedNewsong: [],
      recommendResource: [],
      recommend: [],
      loading: true
    };
  },
  created() {
    let that = this;
    let api = that.$http;
    function getMvFist() {
      return api.get(that.$api + "/banner");
    }
    function getNewSong() {
      return api.get(that.$api + "/top/song?type=0");
    }
    function getRecomRes() {
      return api.get(that.$api + "/personalized/resource");
    }
    // function getRecommend(){
    //     return api.get(that.$api+'/recommend');
    // }
    this.$nextTick(() =>
      api.all([getMvFist(), getNewSong(), getRecomRes()]).then(
        api.spread((mvF, NewS, RecomRes) => {
          that.mvFirst = mvF.data.banners;
          that.personalizedNewsong = NewS.data.data.slice(0, 10);
          // Recommends.data.recommend.unshift({id:'1',picUrl:'1',name:'每日歌曲推荐',copywriter:'根据你的口味生成，每天更新！'});
          // that.recommend = Recommends.data.recommend;
          that.recommendResource = RecomRes.data.result
            .slice(0, 9)
            .map(item => {
              item.playCount = parseInt(item.playCount / 10000) + "万";
              return item;
            });
          that.recommendResource.unshift({
            id: "1",
            icon: "iconfont icon-rili",
            name: "每日歌曲推荐",
            copywriter: "根据你的口味生成，每天更新！"
          });
          that.loading = false;
        })
      )
    );
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/_comstyle.scss";

$base-border: 1px solid darkgray;

.recommend,
.el-carousel {
  width: 100%;
}
.musicCont {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.innerTitle {
  font-size: 12px;
  font-weight: bold;
  margin-left: 10px;
}
.musicDiv {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  position: relative;
  .playCount {
    position: absolute;
    font-size: 12px;
    right: 10px;
    padding-right: 5px;
    padding-top: 2px;
    color: white;
    font-weight: bolder;
    background-color: rgba(169, 169, 169, 0.35);
  }
  .musicPic {
    width: 140px;
    height: 140px;
    border-radius: 5px;
    text-align: center;
    line-height: 140px;
    position: relative;
    i {
      font-size: 90px;
    }
    .dateDay {
      position: absolute;
      left: calc(50% - 20px);
      width: 40px;
      font-size: 28px;
      padding-top: 10px;
    }
  }
  .musicName {
    width: 150px;
    font-size: 14px;
    font-weight: bold;
  }
}
.newDiv {
  display: flex;
  font-size: 14px;
  flex-wrap: wrap;
  .newItems {
    display: flex;
    align-items: center;
    width: 45.9%;
    padding:10px 0;
    margin-right:20px;
    border-top:1px solid gainsboro;
  }
  .newImg {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-left: 10px;
  }
  .newIndex {
    margin:0 10px;
  }
  .newName{
      margin:5px 0;
  }
  .newIndex,
  .newArtName {
    color: gray;
  }
}
.recCar {
  height: 200px;
  margin: 10px 0;
  text-align: center;
  position: relative;
  .bannerImg {
    width: 380px;
    height: 170px;
    border-radius: 5px;
    background-size: cover;
    position: relative;
    .bannerTitle {
      position: absolute;
      bottom: 1px;
      right: 1px;
      border-bottom-right-radius: 5px;
      border-top-left-radius: 5px;
      font-size: 12px;
      padding: 5px 10px;
      color: white;
      background-color: red;
    }
  }
}

.perRecomd {
  display: flex;
  margin-left: 30px;
  width: 350px;
  padding: 10px 0;
  // &:nth-child(odd) {
  //     border: $base-border {
  //         top: 0px;
  //         left: 0px;
  //     }
  // }
  // &:nth-child(2) {
  //     border-bottom: $base-border
  // }
  .dayDiv {
    width: 125px;
    height: 125px;
    text-align: center;
    line-height: 125px;
    border-radius: 5px;
    border: 1px solid gray;
    .daydate {
      width: 125px;
      height: 125px;
      border-radius: 5px;
      color: red;
      font-size: 24px;
      font-size: 80px;
      font-weight: bold;
    }
  }
  .perRight {
    margin-left: 10px;
    width: 200px;
    .preSpan {
      font-size: 14px;
      color: gray;
    }
  }
}
</style>

