<template>
    <div v-loading="loading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="white">
        <div style="margin-top:30px;">
        <span class="title">全部</span>
        <span v-for="item in titles" :key="item.index" class="otherTitle">{{item}}</span>
        <hr class="titleHr"/>
        <div class="newMusic">
            <div class="newList listTop" style="">
                <span><i class="iconfont icon-play-circle"></i></span>
                <span class="newFont">播放全部</span>
            </div>
            <br>
            <div class="newList" v-for="(item,index) in songList" :key="item.id">
                <span>{{String(index+1).padStart(2,0)}}</span>
                <div class="newFont">{{item.name}} <span v-if="item.alias.length">({{item.alias[0]}})</span></div>
                <div class="newPername">{{item.artists[0].name}}</div>
                <div class="newPername">{{item.album.name}}</div>
                <!-- <div class="newTime">{{item.bMusic}}</div> -->
                    <!-- {{parseInt(item.bMusic.playTime/(1000*60))+":"+ parseInt((item.bMusic.playTime-180000)/1000)}}</div> -->
                
            </div>
        </div>
    </div>
    </div>
</template>
<script>
    export default {
        name: 'newest',
        data(){
            return {
                loading: true,
                titles:['华语','欧美','韩国','日本'],
                songList:[]
            }
        },
        created(){
            this.$http.get(this.$api+'/top/song').then(res=>{
                this.songList = res.data.data.slice(0, 100);
                this.loading=false;
            })
        }
    }
</script>
<style lang="scss" scoped>
@import "@/assets/_comstyle.scss";

.newMusic {
    height: auto;
    border: 1px solid rgba(169, 169, 169, 0.25);
    padding: 0;
    
    .newList {
        width:725px;
        padding: 5px 10px;
        .newFont {
            width: 310px;
            white-space: nowrap;
            overflow: hidden;
            span {
                color: gray;
            }
        }
        .newPername{
            width: 130px;
            white-space: nowrap;
            overflow: hidden;
            text-align: left;
        }
        .newTime{
            width: 100px;
            text-align: right;
            display: inline-block;
        }
        &:nth-child(odd){
            background-color: rgba(169, 169, 169, 0.15);
        }
        &:nth-child(even){
            background-color: white;
        }
    }
    .listTop {
        background-color:white !important;
        padding:10px 0;
        font-size: 14px;
        padding: 10px 0px 10px 10px;
        i {
            color: red;
        }
    }
}
.otherTitle{
    font-size: 16px;
    margin-left: 20px;
}
</style>
