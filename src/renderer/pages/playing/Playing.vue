<template>
    <div v-cloak v-loading='loading' element-loading-text='加载中' element-loading-spinner='el-icon-loading' element-loading-background='white' class="playingMain">
        <div class="lyric-wrapper" ref="lyricList">
            <img :src="playImg" class="background">
            <!-- <div class="pendant" :class="{imgPluse:!isPlaying,imgPlay:isPlaying}"></div> -->
            <div class="playImgDiv">
                <!-- <img class="stink" src="../../assets/stink.png" alt=""> -->
                <img class="playImg" :src="playImg" :class="{playPause:!isPlaying}">
                <div class="btns">
                    <el-button size="mini" icon="el-icon-star-off">喜欢</el-button>
                    <el-button size="mini" icon="el-icon-news">收藏</el-button>
                    <el-button size="mini" icon="el-icon-download">下载</el-button>
                    <el-button size="mini" icon="el-icon-share">分享</el-button>
                </div>
            </div>
            <div style="width:350px">
                <div class="songTitle">
                    <h3>{{songDetail.name}}</h3>
                    <div class="songDes">
                        <span>专辑:<a href="#">{{songDetail.al.name}}</a></span>
                        <span>歌手:<a href="#">{{songDetail.ar[0].name}}</a></span>
                    </div>
                </div>
                <div class="lyric">
                    <p v-for="(line,index) in currentLyric.lines" ref="lyricLine" :key="index" :class="{'current':currentLineNum===index}" class="text">{{line.txt}}</p>
                </div>
            </div>
        </div>
        <div class="playBtmDiv">
            <div class="playBtmLeft">
                <div>
                    <span class="title">听友评论</span>
                    <span class="innerTitle">(已有{{commentTotal}}条评论)</span>
                    <hr class="titleHr" />
                </div>
                <div class="inputComent">
                    <el-input type="textarea" :rows="2"></el-input>
                    <div style=" margin-top: 5px;">
                        <span>^-^</span>
                        <span>@</span>
                        <el-button size="mini" style="float:right">评论</el-button>
                    </div>
                </div>
                <span class="comtType">精彩评论</span>
                <div class="comtMain" v-for="item in hotComments" :key="item.commentId">
                    <img :src="item.user.avatarUrl" class="comtUserImg" alt="">
                    <div class="comtDiv">
                        <div class="comtUserDiv">
                            <span class="comtUser">{{item.user.nickname}}:</span>
                            <span>{{item.content}}</span>
                        </div>
                        <div class="comTimeDiv">
                            <span class="comtTime">{{new Date(item.time).toLocaleString()}}</span>
                            <div class="comtOp">
                                <span><i class="iconfont icon-like"></i>({{item.likedCount}})</span>
                                <span>回复</span>
                            </div>
                        </div>
                    </div>
                </div>
    
                <span class="comtType">最新评论({{commentTotal}})</span>
                <div class="comtMain" v-for="item in comments" :key="item.commentId">
                    <img :src="item.user.avatarUrl" class="comtUserImg" alt="">
                    <div class="comtDiv">
                        <div class="comtUserDiv">
                            <span class="comtUser">{{item.user.nickname}}:</span>
                            <span>{{item.content}}</span>
                        </div>
                        <div class="comTimeDiv">
                            <span class="comtTime">{{new Date(item.time).toLocaleString()}}</span>
                            <div class="comtOp">
                                <span><i class="iconfont icon-like"></i>({{item.likedCount}})</span>
                                <span>回复</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="playBtmRight">
                <span class="title">包含这首歌的歌单</span>
                <hr class="titleHr" />
                <div>
                    <div v-for="item in simiPlaylist" :key="item.id" class="simiDiv">
                        <img :src="item.coverImgUrl" alt="" style="width:50px;height: 50px;">
                        <div class="simiInerDiv">
                            <span>{{item.name}}</span>
                            <span class="simiSpan">播放{{parseInt(item.playCount/10000)}}万</span>
                        </div>
                    </div>
                </div>
    
                <div class="simiSongMain">
                    <span class="title">相似歌曲</span>
                    <hr class="titleHr" />
                    <div>
                        <div v-for="item in simiSongs" :key="item.id" class="simiSongDiv">
                            <span><i class="iconfont icon-music"></i></span>
                            <span>{{item.name}}</span>
                            <span class="simiArtName">{{item.artName}}</span>
                        </div>
                    </div>
                </div>
    
                <div class="simiSongMain">
                    <span class="title">喜欢这首歌的人</span>
                    <hr class="titleHr" />
                    <div>
                        <div v-for="item in simiUser" :key="item.id" class="simiSongDiv">
                            <img :src="item.avatorUrl" alt="" style="width:50px;height: 50px;">
                            <div class="simiInerDiv">
                                <span>{{item.nickname}}</span>
                                <span class="simiSpan">{{item.recommendReason}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Lyric from 'lyric-parser'
    import {
        mapGetters
    } from 'vuex'
    import Scroll from '@/components/scroll'
    export default {
        name: 'playing',
        data() {
            return {
                loading: true,
                songDetail: '',
                currentLyric: [],
                currentLineNum: 0,
                currentPlaying: '',
                isPlaying: '',
                showImg: true,
                open: false,
                playImg: '',
                hotComments: '',
                comments: '',
                commentTotal: '',
                simiPlaylist: [],
                simiSongs: [],
                simiUser: []
            }
        },
        async created() {
            this.$http.get(this.$api + '/lyric').then(res => {
                this.currentLyric = new Lyric(res.data.lrc.lyric, this.handleLyric);
                this.loading = false;
            })
            await this.$http.get("http://47.100.49.193:3000/song/detail?ids=" + 1294899029).then(res => {
                this.songDetail = res.data.songs[0];
            })
            this.$http.get("http://47.100.49.193:3000/album?id=" + this.songDetail.al.id).then(res => {
                this.playImg = res.data.album.picUrl
            })
            this.$http.get("http://47.100.49.193:3000/comment/music?id=" + 1294899029).then(res => {
                this.hotComments = res.data.hotComments.slice(0, 10);
                this.comments = res.data.comments;
                this.commentTotal = res.data.total;
            })
            this.$http.get("http://47.100.49.193:3000/simi/playlist?id=" + 1294899029).then(res => {
                res.data.playlists.map(item => {
                    this.simiPlaylist.push({
                        desc: item.description,
                        name: item.name,
                        id: item.id,
                        coverImgUrl: item.coverImgUrl,
                        playCount: item.playCount
                    })
                })
            })
    
            this.$http.get("http://47.100.49.193:3000/simi/song?id=" + 1294899029).then(res => {
                res.data.songs.slice(0, 5).map(item => {
                    this.simiSongs.push({
                        artName: item.artists[0].name,
                        name: item.name,
                        id: item.id,
                    })
                })
            })
    
            this.$http.get("http://47.100.49.193:3000/simi/user?id=1294899029").then(res => {
                setTimeout(()=>{
                    let a =  res.data.userprofiles;
                    a.map(item => {
                    this.simiUser.push({
                        userName: item.nickname,
                        id: item.userId,
                        avatarUrl: item.avatarUrl,
                        recommendReason: item.recommendReason
                    })
                })
                },1)
                
            })
    
            // this.isPlaying = this.$store.getters.getIsPlaying;
        },
        methods: {
            handleLyric({
                lineNum,
                txt
            }) {
                this.currentLineNum = lineNum
                // 若当前行大于5,开始滚动,以保歌词显示于中间位置
                if (lineNum > 5) {
                    let lineEl = this.$refs.lyricLine[lineNum - 5]
                    // 结合better-scroll，滚动歌词
                    this.$refs.lyricList.scrollToElement(lineEl, 1000)
                } else {
                    this.$refs.lyricList.scrollToElement(0, 0, 1000)
                }
            }
        },
        computed: {
            ...mapGetters([
                'getIsPlaying'
            ])
        },
        watch: {
            getIsPlaying: function(a) {
                this.isPlaying = a;
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import "@/assets/_comstyle.scss";
    [v-cloak] {
        display: none;
    }
    
    .playingMain {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        display: block;
    }
    
    @keyframes pluse {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(-30deg);
        }
    }
    
    @keyframes pluseBlack {
        from {
            transform: rotate(-30deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
    
    .imgPluse {
        animation: pluse 0.5s linear forwards;
    }
    
    .imgPlay {
        animation: pluseBlack 0.5s linear forwards;
    }
    
    .playPause {
        animation-play-state: paused !important;
    }
    
    .pendant {
        position: absolute;
        left: 15rem;
        top: 30px;
        width: 6rem;
        z-index: 2;
        height: 10rem;
        background: url(../../assets/stick-bg.png) no-repeat center / 6rem 10rem;
    }
    
    .lyric-wrapper {
        width: 100%;
        display: flex;
        height: 520px;
    }
    
    @keyframes rotates {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    
    .playImgDiv {
        width: 500px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .stink {
            width: 100px;
            height: 135px;
            position: absolute;
        }
        .playImg {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            border: 50px solid rgba(0, 0, 0, 0.8);
            animation: rotates 20s linear infinite;
        }
    }
    
    .background {
        position: absolute;
        width: 100%;
        height: 500px;
        z-index: -1;
        opacity: 0.6;
        filter: blur(30px);
    }
    
    .btns {
        margin-top: 50px;
    }
    
    .songTitle {
        border-bottom: 1px solid gainsboro;
        padding-bottom: 10px;
        margin-bottom: 20px;
        .songDes {
            font-size: 12px;
            color: #484747;
            margin-right: 20px;
            a {
                color: #1560a9;
                margin: 0 10px;
                text-decoration: none;
            }
        }
    }
    
    .lyric {
        margin: 0 auto;
        height: 350px;
        text-align: left;
        overflow-y: auto;
        border-right: 1px solid gainsboro;
        p {
            margin: 5px 0;
            font-size: 14px;
        }
    }
    
    .title {
        margin: 0
    }
    
    .playBtmDiv {
        background-color: white;
        width: 100%;
        display: flex;
        .playBtmLeft {
            width: 510px;
            padding-left: 30px;
            .innerTitle {
                font-size: 12px;
                color: gray;
                margin-left: 10px;
            }
            .inputComent {
                border: 1px solid gainsboro;
                padding: 10px 10px 15px 10px;
                margin: 25px 0 30px 0;
            }
            .comtType {
                font-size: 14px;
                font-weight: bold;
            }
        }
        .comtMain {
            display: flex;
            padding: 15px 0;
            border-top: 1px dotted gray;
            .comtUserImg {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                flex-grow: 1;
            }
            .comtDiv {
                width: 100%;
                font-size: 12px;
                margin-left: 10px;
                .comtUserDiv {
                    .comtUser {
                        color: #1560a9;
                    }
                }
                .comTimeDiv {
                    display: flex;
                    font-size: 12px;
                    margin-top: 5px;
                    justify-content: space-between;
                    .comtTime {
                        color: gray
                    }
                }
            }
        }
        .playBtmRight {
            margin-left: 40px;
            .simiDiv,
            .simiInerDiv {
                display: flex;
                margin-top: 15px;
            }
            .simiDiv {
                align-items: center;
            }
            .simiInerDiv {
                flex-direction: column;
                font-size: 12px;
                margin-left: 10px;
                .simiSpan {
                    color: gray;
                    margin-top: 5px;
                }
            }
            .simiSongMain {
                margin-top: 50px;
            }
            .simiSongDiv {
                font-size: 12px;
                margin: 10px 0;
                i {
                    margin-right: 10px;
                    color: gray;
                }
                .simiArtName {
                    color: gray;
                    float: right;
                }
            }
        }
    }
</style>