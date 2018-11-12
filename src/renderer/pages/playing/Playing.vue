<template>
    <div v-cloak v-loading='loading' element-loading-text='加载中' element-loading-spinner='el-icon-loading' element-loading-background='white' class="playingMain">
        <div class="lyric-wrapper" ref="lyricList">
            <img :src="playImg" class="background">
            <div class="pendant" :class="{imgPluse:!isPlaying,imgPlay:isPlaying}"></div>
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
                    <span class="innerTitle">(已有***条评论)</span>
                </div>
                <div>
                    <el-input></el-input>
                </div>
                <div class="comtMain">
                    <img src="../../assets/head.jpeg" class="comtUserImg" alt="">
                    <div class="comtDiv">
                        <div class="comtUserDiv">
                            <span class="comtUser">asdfas</span>
                            <span>123123123123123123123123</span>
                        </div>
                        <div class="comTimeDiv">
                            <span class="comtTime">11月11日11:11</span>
                            <div class="comtOp">
                                <span><i class="iconfont icon-like"></i>(1233123)</span>
                                <span>回复</span>
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
                playImg: ''
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
            this.$http.get(" http://47.100.49.193:3000/album?id=" + this.songDetail.al.id).then(res => {
                this.playImg = res.data.album.picUrl
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
    
    .playBtmDiv {
        background-color: white;
        width: 100%;
        .playBtmLeft{
            width: 510px;
        }
        .comtMain {
            display: flex;
            padding: 10px 0;
            .comtUserImg {
                width: 50px;
                height: 50px;
                border-radius: 50%
            }
            .comtDiv {
                width: 100%;
                font-size: 14px;
                margin-left: 10px;
                .comtUserDiv {
                    margin-top: 5px;
                    .comtUser {
                        color: #1560a9;
                    }
                }
                .comTimeDiv {
                    display: flex;
                    font-size: 12px;
                    justify-content: space-between;
                    .comtTime {
                        color: gray
                    }
                }
            }
        }
    }
</style>