<template>
    <div v-loading='loading' element-loading-text='加载中' element-loading-spinner='el-icon-loading' element-loading-background='white' style="width:100%;display: block;padding:0 20px">
        <div class="titleDiv">
            <span class="title">{{title}}</span>
            <span class="subTitle">{{data.length}}{{subTitle}}</span>
        </div>
        <div class="dataList">
            <div class="list" v-for="item in data" :key="item.id">
                <div class="head">
                    <img class="headImg" :src="item.picUrl" alt="">
                    <span>{{item.name}}</span>
                </div>
                <span class="preSpan">{{spanTitle[0]}}：{{item.albumSize || item.dj.nickname}}</span>
                <span class="nextSpan">{{spanTitle[1]}}：{{item.mvSize || item.programCount}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                loading: true,
                title: '我订阅的电台',
                subTitle: '',
                data: [],
                spanTitle: [],
            }
        },
        watch: {
            '$route' (to, from) {
                this.$nextTick(
                    () => {
                        if (this.$route.query.id === 'singer') {
                            this.title = "我的歌手"
                            this.subTitle = "位歌手"
                            this.spanTitle= ['专辑', 'MV'];
                            this.$http.get(this.$api + "/artist/sublist").then(res => {
                                this.data = res.data.data
                                this.loading = false;
                            })
                        } else {
                            this.title = "我订阅的电台"
                            this.subTitle = "个电台"
                            this.$http.get(this.$api + "/fm/list").then(res => {
                                this.data = res.data.djRadios
                                this.loading = false;
                                this.spanTitle = ['by', '节目']
                            })
                        }
    
                    }
                )
            }
        },
    }
</script>

<style lang='scss' scoped>
    .titleDiv {
        padding: 20px 0 15px 30px;
        border-bottom: 1px solid #c8c8c8;
    }
    
    .title {
        font-size: 18px;
        font-weight: bold
    }
    
    .subTitle {
        font-size: 12px;
        color: gray;
    }
    
    .dataList {
        display: flex;
        flex-direction: column;
        width: 100%;
        .list {
            display: flex;
            align-items: center;
            padding: 0 30px;
            .head {
                display: flex;
                height: 45px;
                align-items: center;
                flex-grow: 1;
                padding: 5px 0;
                span {
                    font-size: 14px;
                    font-weight: bold;
                    margin-left: 5px;
                }
                .headImg {
                    width: 40px;
                    border: 1px solid #c8c8c8;
                }
            }
            >span {
                font-size: 12px;
                color: gray;
            }
            .preSpan {
                margin-right: 50px
            }
            .nextSpan {
                width: 50px;
            }
        }
    }
</style>