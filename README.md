### 简介
像官网说的那样，electron-vue就是基于 vue 来构造 electron 应用程序的样板代码。electron-vue开发起来就和vue一样，只是如果有特殊的需求需要修改应用的话就要用到electron相关的api，项目中的数据来自[这里](https://binaryify.github.io/NeteaseCloudMusicApi)，感谢大佬的分享。项目地址[git地址](https://github.com/lucaswww/my-electron-vue)   
### electron
Electron是由Github开发，用HTML，CSS和JavaScript来**构建跨平台桌面应用程序**的一个开源库。 Electron通过将Chromium和Node.js合并到同一个运行时环境中，并将其打包为Mac，Windows和Linux系统下的应用来实现这一目的。(摘之[官网](https://electronjs.org/docs/tutorial/about))  

### vue
vue的话就不多提了，[网站](https://cn.vuejs.org/v2/guide/)

### 预览

![](https://user-gold-cdn.xitu.io/2018/11/2/166d3d82d8505236?w=1000&h=670&f=png&s=449881)

![](https://user-gold-cdn.xitu.io/2018/11/2/166d3d7d3ca108ca?w=1000&h=670&f=png&s=174460)

![](https://user-gold-cdn.xitu.io/2018/11/2/166d3d7735e372f4?w=1000&h=670&f=png&s=467554)

![](https://user-gold-cdn.xitu.io/2018/11/2/166d3d7258266506?w=1000&h=670&f=png&s=114968)

* 18/11/05更新
点击左侧歌单栏跳转对应歌单详情
![](https://user-gold-cdn.xitu.io/2018/11/5/166e3149d80490b3?w=1000&h=670&f=png&s=164060)

* 18/11/10更新
我的歌手、电台
![](https://user-gold-cdn.xitu.io/2018/11/10/166fb73940eddf40?w=1000&h=670&f=png&s=77279)
![](https://user-gold-cdn.xitu.io/2018/11/10/166fb7459cf50a1a?w=1000&h=670&f=png&s=78189)
* 18/11/12更新
播放页面暂时排版
![](https://user-gold-cdn.xitu.io/2018/11/12/16707128f076819d?w=1000&h=670&f=png&s=452343)
### 项目流程
可以先去[electron官网](https://electronjs.org/docs/tutorial/first-app)了解一下它的开发流程，知道它大体是个怎样的情况就好，后面使用的时候可以再来看看它的api.
#### 搭建
```
npm install -g vue-cli  
vue init simulatedgreg/electron-vue ele-vue
cd ele-vue
npm install
npm run dev
```
安装过程中一路回车就行，中途会有个让你选择插件的时候，也是为了后面自己手动去装，这里就根据需要选择。
![](https://user-gold-cdn.xitu.io/2018/11/2/166d3ba53a53516b?w=564&h=221&f=jpeg&s=37367)
#### electron-packager
如果你刚开始制作 electron 应用程序或只需要创建简单的可执行文件，那么 electron-packager 就可以满足你的需求。

#### electron-builder
如果你正在寻找完整的安装程序、自动更新的支持、使用 Travis CI 和 AppVeyor 的 CI 构建、或本机 node 模块的自动重建，那么你会需要 electron-builder。  
#### 还是根据自己的需要选择
![](https://user-gold-cdn.xitu.io/2018/11/2/166d3bd60782fe48?w=563&h=230&f=png&s=39591)
这些完成以后就可以像开发vue一样去开发项目了。  
### 插件方面
electron-vue中也是能使用前端的ui组件的，以element-ui为例
```
npm i element-ui -S
然后在main.js中引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

```
### electron
```
一点自己的配置
mainWindow = new BrowserWindow({
    height: 670,//窗口高度
    width: 1000,//窗口宽度
    frame: true,//是否显示窗口边框
    resizable: false,//可否缩放
    movable: true//可否移动
  })
```
### iconfont
element的icon可能并不能满足我们的需求，这时候可以选择使用阿里的iconfont。  
先去[iconfont](http://www.iconfont.cn/)官网选择你想要的icon，

![](https://user-gold-cdn.xitu.io/2018/11/2/166d3cc0398e3569?w=130&h=144&f=png&s=7982)
选择添加到你自己的项目
![](https://user-gold-cdn.xitu.io/2018/11/2/166d3ccb49b2334c?w=301&h=272&f=png&s=11194)
然后可以在自己的项目中选择生成，复制代码到electron-vue项目的index.ejs中，正常引用css
`<link rel="stylesheet" href="//at.alicdn.com/t/font_883876_bfzwywhpal.css">`
使用`<i class="iconfont icon-play-circle"></i>`
![](https://user-gold-cdn.xitu.io/2018/11/2/166d3cdb83b43cdf?w=575&h=299&f=png&s=26167)
### 打包
直接使用`npm run build`就可以打包，若是要针对不同平台则按需添加参数，打包后的安装包在项目的build文件夹下

### 最后
界面是两天开发出来的。。所以某些样式不太美观。有个问题是打包以后iconfont不显示了，这个问题后面再解决一下，最直接的办法还是把它下到本地引用。
