<template>
  <div style="flex-direction: column;">
    <div class="userDiv" v-if="userInfo">
      <div class="bigHead" :style="{'backgroundImage':'url('+userInfo.profile.avatarUrl+')'}"></div>
      <div class="userInfo" v-if="userInfo">
        <span class="userName">{{userInfo.profile.nickname}}</span>
        <div class="userTags">
          <span>黑胶vip</span>
          <span>Lv.9</span>
          <span>♂</span>
        </div>
        <div class="userActions">
          <div>
            <div class="userAcNum">{{userInfo.profile.eventCount}}</div>
            <span>动态</span>
          </div>
          <div>
            <div class="userAcNum">{{userInfo.profile.follows}}</div>
            <span>关注</span>
          </div>
          <div>
            <div class="userAcNum">{{userInfo.profile.followeds}}</div>
            <span>粉丝</span>
          </div>
        </div>
        <div class="userDisc">
          <div>
            <span class="prespan">个人介绍:</span>
            <span class="nextspan">{{userInfo.profile.signature}}</span>
          </div>
          <div>
            <span class="prespan">所在地区:</span>
            <span class="nextspan">江西省 景德镇市</span>
          </div>
          <div>
            <span class="prespan">社交网络:</span>
            <span>
              <i class="iconfont icon-weibo userSNS" style="color:white;background-color:red"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="playlist">
      <span class="playlistTitle">我创建的歌单（{{userInfo.profile.playlistCount}}）</span>
      <play-item v-if="userInfo" :playlist="playlist"/>
    </div>
  </div>
</template>

<script>
import PlayItem from "../../components/PlayItem.vue";
export default {
  name: "info",
  components: { PlayItem },
  data() {
    return {
      showMenus: true,
      userInfo: {},
      playlist: []
    };
  },
  created() {
    let userInfo = this.$store.getters.getUserInfo;
    let playlist = this.$store.getters.getUserPlayList;
    playlist[0].name = "我喜欢的音乐";
    this.userInfo = userInfo;
    let myplaylist = {
      id: "0",
      coverImgUrl:
        "https://izaya-1256042946.cos.ap-chengdu.myqcloud.com/mylisten.png?q-sign-algorithm=sha1&q-ak=AKIDoSTU6iF36bo74a7voqESWeiXBshGot42&q-sign-time=1550544318;1550546118&q-key-time=1550544318;1550546118&q-header-list=&q-url-param-list=&q-signature=24f240ea6f299653b65c7b80e8acbe677fd1e295&x-cos-security-token=e519a6cc09327dbb894bced8ff4416ff4be9591610001",
      name: "我的听歌排行榜",
      trackCount: "累计听歌" + userInfo.listenSongs,
      backgroundColor: "rgba(0, 0, 0, 0.68)"
    };
    this.playlist = [myplaylist, ...playlist];
  }
};
</script>

<style lang="scss" scoped>
.userDiv {
  display: flex;
  width: 100%;

  .bigHead {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin: 0 20px;
    background-size: cover;
    cursor: pointer;
  }
  .userInfo {
    flex-grow: 1;
    .userName {
      font-size: 20px;
      font-weight: bold;
    }
    .userTags {
      font-size: 12px;
      padding: 10px 0;
      border-bottom: 1px solid gainsboro;
      span {
        padding: 2px 5px;
        height: 10px;
        border-radius: 10px;
        background-color: rgb(180, 177, 177);
        min-width: 20px;
        height: 15px;
        line-height: 15px;
        display: inline-block;
        text-align: center;
        font-size: 10px;
      }
    }
    .userActions {
      display: flex;
      padding: 10px 0;
      > div {
        padding: 0 40px 0 20px;
        border-right: 1px solid gainsboro;
        &:first-child {
          padding-left: 0;
        }
        &:last-child {
          border: none;
        }
      }
      span {
        font-size: 12px;
        color: gray;
      }
      .userAcNum {
        text-align: center;
        font-size: 20px;
        font-weight: 600;
      }
    }
    .userDisc {
      font-size: 12px;
      > div {
        margin: 10px 0;
      }
      .prespan {
        color: rgba(0, 0, 0, 0.8);
      }
      .nextspan {
        color: gray;
      }
      .userSNS {
        padding: 3px;
        border-radius: 50%;
        color: white;
        background-color: red;
        font-size: 14px;
        padding: 2px;
      }
    }
  }
}
.playlist {
  display: flex;
  flex-direction: column;
  flex: 1;
  .playlistTitle {
    margin: 10px 0;
  }
}
</style>