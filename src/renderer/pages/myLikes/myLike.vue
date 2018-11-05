<template>
    <div v-if="!loading" v-loading='loading' element-loading-text='加载中' class="myLike" element-loading-spinner='el-icon-loading' element-loading-background='white'>
        <div class="listTop">
            <div><img :src="playlist.coverImgUrl" style="width:180px;height:180px"></div>
            <div>
                <div class="listInfo">
                    <div class="listInfoTop">
                        <div style="display: flex;align-items: center;">
                            <span class="listSpan">歌单</span>
                            <span class="listName">{{playlist.name}}</span>
                        </div>
                        <div class="listCount">
                            <div>
                                <span class="fontC">歌曲数</span>
                                <br>
                                <span class="fontP">{{playlist.trackCount}}</span>
                            </div>
                            <span class="fontS">/</span>
                            <div>
                                <span class="fontC">收听数</span>
                                <br>
                                <span class="fontP">{{playlist.playCount}}</span>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex;align-items: center;">
                        <img :src="playlist.creator.avatarUrl" style="width:36px;height:36px;border-radius:50%">
                        <span class="creatorName">{{playlist.creator.nickname}}</span>
                        <span class="createTime">{{new Date(playlist.createTime).toLocaleDateString()}}创建</span>
                    </div>
                    <div style="display: flex;margin-top:20px;">
                        <el-button-group style="margin-right:10px">
                            <el-button size="mini"><i class="iconfont icon-play-circle"></i><span class="btnSpan">播放全部</span></el-button>
                            <el-button size="small"><i class="el-icon-plus"></i></el-button>
                        </el-button-group>
                        <el-button size="mini"><i class="iconfont icon-star"></i><span class="btnSpan">收藏(0)</span></el-button>
                        <el-button size="mini"><i class="iconfont icon-share"></i><span class="btnSpan">分享(0)</span></el-button>
                        <el-button size="mini"><i class="iconfont icon-plus-download"></i><span class="btnSpan">下载全部</span></el-button>
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
                        <th>操作</th>
                        <th>音乐标题</th>
                        <th>歌手</th>
                        <th>专辑</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in playlist.tracks" :key="item.id">
                            <td class="indexTd">{{String(index+1).padStart(2,0)}}</td>
                            <td class="secTd"><i class="iconfont icon-zan1"></i><i class="iconfont icon-plus-download"></i></td>
                            <td>{{item.name}}</td>
                            <td>{{item.ar[0].name}}</td>
                            <!-- <td>{{item.al.name}}</td> -->
                            <td>{{item.al.name}}</td>
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
            '$route' (to, from) {
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
            }
        }
    };
</script>

<style lang='scss' scoped>
    $myred: rgb(185, 37, 0);
    .myLike {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        display: block;
        background-color: rgb(249, 249, 249)
    }
    
    .listTop {
        display: flex;
        width: 750px;
        height: 200px;
        padding: 25px;
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
    }
    
    .fontC {
        font-style: italic;
        font-size: 12px;
        font-weight: bold;
        color: #7c7c7c;
    }
    
    .fontP {
        font-style: italic;
        font-weight: bold;
        float: right;
        padding-right: 8px;
        padding-top: 2px;
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
        font-size: 14px;
        margin: 0 5px;
    }
    
    .createTime {
        font-size: 12px;
        color: #7c7c7c;
    }
    
    .listBanTitle {
        padding-left: 25px;
    }
    
    .listBan {
        padding: 10px;
        font-size: 14px;
        font-weight: bold;
        background-color: #f4f4f4;
        border: 1px solid #c8c8c8;
        border-bottom: $myred;
    }
    
    .listBanAct {
        background-color: $myred;
        color: white;
    }
    
    .btnSpan {
        font-size: 14px;
        margin-left: 3px;
    }
    
    .el-button--mini {
        padding: 7px 10px;
    }
    
    .songList {
        border-top: 2px solid $myred;
        margin-top: 8px;
        table {
            font-size: 12px;
            width: 100%;
        }
        th {
            text-align: left;
            color: #7c7c7c;
            border: 1px solid #d4d4d4 {
                top: 0;
                right: 0;
            }
            padding:5px 10px;
        }
        tr {
            &:nth-child(even) {
                background-color: #f4f4f4
            }
            .indexTd {
                text-align: right;
                width: 30px;
                padding-right: 5px;
            }
            .secTd {
                width: 30px;
            }
        }
        td {
            padding: 5px 10px;
        }
        .icon-zan1 {
            color: rgb(217, 22, 23)
        }
        .icon-plus-download {
            color: #b6b6b6;
            margin-left: 10px
        }
    }
</style>