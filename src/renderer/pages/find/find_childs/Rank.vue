<template>
    <div class="rank"
        v-loading="loading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="white">
        <div>
            <span class="title">官方榜</span>
            <span class="title2">全球榜</span>
            <hr class="titleHr"/>
            <div class="rankDiv">
                <div class="rankTitle rankTitle1">
                    <span class="firtsW">飙</span>
                    <div>
                        <span class="otherW">升榜</span>
                        <br>
                        <span class="daydate">(11月02日更新)</span>
                    </div>
                    <div>
                            <i class="iconfont icon-play-circle"></i>
                    </div>
                </div>
                <div>
                    <div class="newList" v-for="(item,index) in personalizedNewsong" :key="item.id">
                        <span>{{(index+1)}}</span>
                        <div class="newFont">{{item.name}}</div>
                        <div class="newPername">{{item.ar[0].name}}</div>
                    </div>
                </div>
                <div class="seeAll"><span>查看全部 ></span></div>
            </div>

            <div class="rankDiv">
                <div class="rankTitle rankTitle2">
                    <span class="firtsW">新</span>
                    <div>
                        <span class="otherW">歌榜</span>
                        <br>
                        <span class="daydate">(11月02日更新)</span>
                    </div>
                    <div>
                            <i class="iconfont icon-play-circle"></i>
                    </div>
                </div>
                <div>
                    <div class="newList" v-for="(item,index) in personalizedNewsong" :key="item.id">
                        <span>{{(index+1)}}</span>
                        <div class="newFont">{{item.name}}</div>
                        <div class="newPername">{{item.ar[0].name}}</div>
                    </div>
                </div>
                <div class="seeAll"><span>查看全部 ></span></div>
            </div>

            <div class="rankDiv">
                <div class="rankTitle3 rankTitle">
                    <span class="firtsW">原</span>
                    <div>
                        <span class="otherW">创榜</span>
                        <br>
                        <span class="daydate">(11月02日更新)</span>
                    </div>
                    <div>
                            <i class="iconfont icon-play-circle"></i>
                    </div>
                </div>
                <div>
                    <div class="newList" v-for="(item,index) in personalizedNewsong" :key="item.id">
                        <span>{{(index+1)}}</span>
                        <div class="newFont">{{item.name}}</div>
                        <div class="newPername">{{item.ar[0].name}}</div>
                    </div>
                </div>
                <div class="seeAll"><span>查看全部 ></span></div>
            </div>


            <div class="rankDiv">
                <div class="rankTitle4 rankTitle">
                    <span class="firtsW">热</span>
                    <div>
                        <span class="otherW">歌榜</span>
                        <br>
                        <span class="daydate">(11月02日更新)</span>
                    </div>
                    <div>
                            <i class="iconfont icon-play-circle"></i>
                    </div>
                </div>
                <div>
                    <div class="newList" v-for="(item,index) in personalizedNewsong" :key="item.id">
                        <span>{{(index+1)}}</span>
                        <div class="newFont">{{item.name}}</div>
                        <div class="newPername">{{item.ar[0].name}}</div>
                    </div>
                </div>
                <div class="seeAll"><span>查看全部 ></span></div>
            </div>

            <div class="rankDiv">
                <div class="rankTitle5 rankTitle">
                    <span class="firtsW">电</span>
                    <div>
                        <span class="otherW">音榜</span>
                        <br>
                        <span class="daydate">(11月02日更新)</span>
                    </div>
                    <div>
                            <i class="iconfont icon-play-circle"></i>
                    </div>
                </div>
                <div>
                    <div class="newList" v-for="(item,index) in personalizedNewsong" :key="item.id">
                        <span>{{(index+1)}}</span>
                        <div class="newFont">{{item.name}}</div>
                        <div class="newPername">{{item.ar[0].name}}</div>
                    </div>
                </div>
                <div class="seeAll"><span>查看全部 ></span></div>
            </div>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'rank',
    data(){
        return {
            personalizedNewsong: [],
            loading: true
        }
    },
    created(){
            let that = this;
            let api = that.$http;
           
            function getNewSong(){
                return api.get(that.$api+'/newSongList');
            }
            
            this.$nextTick(()=>
                {
                    api.get(that.$api+'/newSongList').then(res=>{
                        that.personalizedNewsong = res.data.playlist.tracks.slice(0, 8);
                        that.loading = false;
                    })

                }
                // api.all([getMvFist(),getNewSong(),getRecomRes(),getRecommend()]).then(api.spread((mvF,NewS,RecomRes,Recommends)=>{
                // that.mvFirst = mvF.data.data.slice(0,6);
                // that.personalizedNewsong = NewS.data.playlist.tracks.slice(0, 20);
                // Recommends.data.recommend.unshift({id:'1',picUrl:'1',name:'每日歌曲推荐',copywriter:'根据你的口味生成，每天更新！'});
                // that.recommend = Recommends.data.recommend;
                // that.recommendResource = RecomRes.data.result.slice(0, 8).map(item=>{item.playCount=parseInt(item.playCount/10000) + '万';return item;});
                // }))
            )
        }
}
</script>
<style lang="scss" scoped>
$base-border: 1px solid rgb(218,218,218);
.rank{
    margin: 30px 0 50px 20px;
}
.title {
  border-bottom: 5px solid darkgray;
  font-size: 20px;
  font-weight: bold;
}
.title2 {
  margin-left: 20px;
  font-size: 18px;
  font-weight: bold;
}
.titleHr {
  margin: 2px 15px 0px 0px;
  color:rgb(218,218,218)
}
.rankDiv{
    width: 240px;
    height: 330px;
    margin-top: 15px;
    margin-right: 5px;
    border: 1px solid darkgray;
    display: inline-block;
}
.rankTitle2{
    background: linear-gradient(to right,rgb(128, 240, 224),rgb(107, 204, 190));
}
.rankTitle1 {
    background: linear-gradient(to right, rgb(225, 104, 108), rgb(223, 99, 103))
}
.rankTitle3 {
    background: linear-gradient(to right, rgb(192,111,153), rgb(184,66,121));
}

.rankTitle4 {
    background: linear-gradient(to right, rgb(166,76,69), rgb(218,182,130))
}

.rankTitle5 {
    background: linear-gradient(to right, rgb(47,47,47), rgb(53,53,53))
}
.rankTitle{
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-bottom: 10px;
    color:white;
    .firtsW{
        font-size:44px;
        margin-right: 5px;
    }
    .otherW{
        font-size:24px;
    }
    .daydate{
        font-size:10px;
    }
    i{
        margin-left: 25px;
        font-size: 45px;
    }
}
.newList{
        display: inline-block;
        align-items: center;
        padding: 5px 0 5px 10px;
        width: 230px;
        font-size:12px;
        &:nth-child(even) {
            background-color:rgba(211, 211, 211, 0.15);
        }
        .newFont{
            display: inline-block;
            font-weight: bold;
            width: 130px;
            margin-left: 10px;
        }
        .newPername{
            display: inline-block;
            width: 70px;
            text-align: right;
        }
    }
.seeAll{
    text-align: right;
    font-size: 12px;
    height: 48px;
    line-height: 48px;
    padding-right: 10px;
}
</style>
