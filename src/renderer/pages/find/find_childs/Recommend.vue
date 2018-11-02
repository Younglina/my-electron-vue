<template>
<div 
    v-loading="loading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="white"
    class="recommend">
    
    <el-carousel :interval="4000" type="card" height="170px" class="recCar">
    <el-carousel-item v-for="item in mvFirst" :key="item.id">
      <img class="mvImg" :src="item.cover" alt="">
    </el-carousel-item>
    </el-carousel>
    <div>
        <span class="title">热门精选</span>
        <hr class="titleHr"/>
        <div class="musicCont">
            <div v-for="item in recommendResource" :key="item.id" class="musicDiv">
                <img class="musicPic" :src="item.picUrl" alt="">
                <span class="musicName">{{item.name}}</span>
            </div>
        </div>
    </div>
    <div style="margin-top:30px;">
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
    </div>
    <div style="margin-top:30px;">
        <span class="title">新歌速递</span>
        <hr class="titleHr"/>
        <div class="newMusic">
            <div class="newList" style="width:745px">
                <i class="iconfont icon-play-circle"></i>
                <span class="newFont">播放全部</span>
            </div>
            <br>
            <div class="newList" v-for="(item,index) in personalizedNewsong" :key="item.id">
                <span>{{String(index+1).padStart(2,0)}}</span>
                <div class="newFont">{{item.name}}</div>
                <div class="newPername">{{item.ar[0].name}}</div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        name: 'recommend',
        data(){
            return {
                mvFirst:[],
                personalizedNewsong:[],
                recommendResource:[],
                recommend: [],
                loading: true
            }
        },
        created(){
            let that = this;
            let api = that.$http;
            function getMvFist(){
                return api.get(that.$api+'/mv/first');
            }
            function getNewSong(){
                return api.get(that.$api+'/newSongList');
            }
            function getRecomRes(){
                return api.get(that.$api+'/personalized');
            }
            function getRecommend(){
                return api.get(that.$api+'/recommend');
            }
            this.$nextTick(()=>
                api.all([getMvFist(),getNewSong(),getRecomRes(),getRecommend()]).then(api.spread((mvF,NewS,RecomRes,Recommends)=>{
                that.mvFirst = mvF.data.data.slice(0,6);
                that.personalizedNewsong = NewS.data.playlist.tracks.slice(0, 20);
                Recommends.data.recommend.unshift({id:'1',picUrl:'1',name:'每日歌曲推荐',copywriter:'根据你的口味生成，每天更新！'});
                that.recommend = Recommends.data.recommend;
                that.recommendResource = RecomRes.data.result.slice(0, 8).map(item=>{item.playCount=parseInt(item.playCount/10000) + '万';return item;});
                that.loading = false;
                }))
            )
        }
    }
</script>
<style lang="scss" scoped>
@import "@/assets/_comstyle.scss";

$base-border: 1px solid darkgray;

.recommend,.el-carousel{
    width: 100%;
}
.musicCont{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.innerTitle{
    font-size:12px;
    font-weight: bold;
    margin-left: 10px;
}
.musicDiv{
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    .musicPic{
        width: 150px;
        height: 150px;
    }
    .musicName {
        width: 150px;
        font-size: 14px;
        font-weight: bold;
    }
}
.mvImg{
    width: 380px;
    height: 170px;
    border-radius: 5px;
}
.recCar{
    height: 200px;
    margin: 10px 0;
    text-align: center;
}

.perRecomd{
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
    .dayDiv{
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
            font-size:24px;
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

