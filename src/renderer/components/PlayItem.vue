<template>
  <div class="playlistMain"  v-if="playlist" >
    <div class="playListDiv" v-for="item in playlist" :key="item.id">
      <div class="playItems" :style="{'backgroundImage':'url('+item.coverImgUrl+')','backgroundColor':item.backgroundColor}">
        <div class="playCount" v-if='item.playCount'>
          <i class="iconfont icon-bofang"></i>
          <span>{{item.playCount}}</span>
        </div>
      </div>
      <div class="playListName">{{item.name}}</div>
      <span class="playListCount">{{item.trackCount}}首</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayItem",
  props: ["playlist"]
};
</script>

<style lang="scss" scoped>
.playlistMain {
  display: flex;
  flex-wrap: wrap;
  .playListDiv {
    margin-right: 15px;
  }
  .playItems {
    position: relative;
    width: 170px;
    height: 170px;
    background-size: cover;
    border-radius: 5px;
    cursor: pointer;

    .playCount {
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 12px;
      color: white;
      i {
        font-size: 12px;
      }
    }
  }
  .playListName {
    font-size: 13px;
    margin: 8px 0 3px;
  }
  .playListCount {
    font-size: 12px;
    color: gray;
  }
}
</style>