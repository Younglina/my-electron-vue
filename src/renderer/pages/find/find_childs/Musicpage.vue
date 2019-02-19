<template>
    <div v-cloak>
        <div style="margin-left:30px;margin-top:30px;">
            <span class="labels">热门标签：</span>
            <span class="labels labelItem" v-for="item in hotLabel" :key="item.id">{{item.name}}</span>
        </div>
    
        <div class="musicCont">
            <div v-for="item in recommendResource" :key="item.id" class="musicDiv">
                <div class="playDiv">
                    <div class="playCount">
                        <i class="iconfont icon-erji"></i>
                        <span>{{item.playCount}}</span>
                    </div>
                    <img class="musicPic" :src="item.picUrl" alt="">
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
                recommendResource: []
            };
        },
        created() {
            let api = this.$http;
            let self = this;
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
        border-left: 1px solid darkgray;
        // &:nth-child(1){
        //     padding: 0;
        //     border: none;
        // }
    }
    
    .musicCont {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .musicDiv {
            display: flex;
            flex-direction: column;
            margin: 20px 30px 20px 0;
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
                    width: 150px;
                    height: 150px;
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
