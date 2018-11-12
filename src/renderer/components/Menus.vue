<template>
<keep-alive>
<div class="menus" v-show="showMenus">
    <div class="menuUl" @click="toPage">
        <ul>
            <li class="titleLi">
                <span>推荐</span>
            </li>
            <li >
                <i class="iconfont icon-yinle"></i>
                <span data-v-name="findMusic/index">发现音乐</span>
            </li>
            <li>
                <i class="iconfont icon-tubiaozhizuomobanyihuifu-"></i>
                <span>私人FM</span>
            </li>
            <li>
                <i class="iconfont icon-desktop"></i>
                <span>MV</span>
            </li>
            <li>
                <i class="iconfont icon-user"></i>
                <span>朋友</span>
            </li>
        </ul>
        <ul>
            <li class="titleLi">
                <span>我的音乐</span>
            </li>
            <li>
                <i class="iconfont icon-yinle"></i>
                <span>iTunes音乐</span>
            </li>
            <li data-v-name="Playing"
                data-v-index ="playing"
                :class="{active:'playing'==active}"
            >
                <i class="iconfont icon-plus-download"></i>
                <span>下载的音乐</span>
            </li>
            <li data-v-name="my/my"
             data-v-id ="singer"
             data-v-index ="mySinger"
             :class="{active:'mySinger'==active}">
                <i class="iconfont icon-user"></i>
                <span>我的歌手</span>
            </li>
            <li data-v-name="my/my"
             data-v-id ="fm"
             data-v-index ="myFm"
             :class="{active:'myFm'==active}">
                <i class="iconfont icon-music"></i>
                <span>我的电台</span>
            </li>
        </ul>
        <ul>
            <li class="titleLi">
                <span>创建的歌单</span>
            </li>
             <li v-for="(item,index) in userPlaylist" v-if="item.userId == '111736605'" 
             :key="item.id"
             data-v-name="myLikes/index"
             :data-v-id ="item.id"
             :data-v-index ="index"
             :class="{active:index==active}"
             >
                <i v-if="index===0" class="iconfont icon-heart"></i>
                <i v-else class="iconfont icon-yinleliebiao"></i>
                <span>{{item.name}}</span>
            </li>
        </ul>
        <ul>
            <li class="titleLi">
                <span>收藏的歌单</span>
            </li>
            <li v-for="(item,index) in userPlaylist" v-if="item.userId != '111736605'" 
             :key="item.id"
             data-v-name="myLikes/index" :data-v-id ="item.id"
             :class="{active:index==active}"
             >
                <i class="iconfont icon-yinleliebiao"></i>
                <span>{{item.name}}</span>
            </li>
        </ul>
    </div>
</div>
</keep-alive>
</template>
<script>
export default {
    name: 'menus',
    data(){
        return {
            userPlaylist:[],
            active:0,
            showMenus:true
        }
    },
    methods: {
        toPage(e){
            let name,id,index;
            
            if(e.target.dataset.vName){
                name = e.target.dataset.vName
                id = e.target.dataset.vId
                index = e.target.dataset.vIndex;
            }else{
                name = e.target.parentNode.dataset.vName
                id = e.target.parentNode.dataset.vId
                index = e.target.parentNode.dataset.vIndex;
            }
            this.active = index;
            if(index=='playing'){
                this.showMenus=false;
            }
            console.log('/page/'+name)
            this.$router.push({path:'/page/'+name,query:{ id:id}});
        }
    },
    created(){
        let self = this;
        self.$http.get(self.$api+'/user/playlist').then(res=>{
            // self.$store.commit('setUserPlayList',res.data.playlist);
            self.userPlaylist = res.data.playlist
        })
        
    }
}
</script>
<style lang="scss" scoped>
.menus{
     width: 200px;
    overflow: auto;
    border-right: 1px solid gray;
    height: 100%;
    .menuUl{
        display: flex;
        flex-direction: column;
        width: 100%;
    }
}
ul {
    list-style: none;
    line-height: 30px;
    margin: 0;
    padding-left: 0px;
    font-size: 14px;
    .titleLi {
            margin-left: -25px;
            font-size: 12px;
            color: darkgray;
    }
    li {
        white-space: nowrap;
        overflow: hidden;
        padding-left: 20px;
        span {
            margin-left: 10px;
        }
        &:hover {
            background-color: #e3e3e3
        }
    }
}
.active{
    background-color: #e3e3e3;
}
</style>
