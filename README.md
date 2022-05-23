# EasyAPI服务市场[https://market.easyapi.com](https://market.easyapi.com)

## 项目介绍
EasyAPI服务市场

## 相关技术和第三方库
* [Nuxt](https://zh.nuxtjs.org)
* [ECMAScript 6 入门](http://es6.ruanyifeng.com/)
* [axios中文说明](https://www.kancloud.cn/yunye/axios/234845)
* [Element组件库](https://element.eleme.cn/)

## Build Setup


``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## 项目目录结构

``` bash
 ├──.nuxt               #
 ├──api                 #api接口目录
 │  ├──api.js           #api接口列表
 ├──assets              #资源目录，用于组织未编译的静态资源如STYLUS LESS、SASS 或 JavaScript
 │  ├──css              #css样式
 │  ├──images           #图片
 │  ├──stylus           #stylus预处理
 ├──components          #组件目录
 │  ├──footer           #footer组件
 │  ├──header           #header组件
 ├──layouts             #布局目录
 ├──middleware          #中间件目录
 ├──pages               #页面目录
 │  ├──post
 │  ├──service
 │  ├──apiservice.vue
 │  ├──index.vue
 │  ├──scene.vue       
 ├──plugins              #插件目录
 ├──static               #静态文件目录，用于存放应用的静态文件，此类文件不会被 Nuxt.js 调用 Webpack 进行构建编译处理
 ├──store                #状态管理目录，Vuex 状态树
 ├──nuxt.config.js       #Nuxt.js配置文件，覆盖默认配置。
 ├──package.json         #用于描述应用的依赖关系和对外暴露的脚本接口


```
## 命名规范

* 使用kebab-case（短横线）命名方式
* 图片资源采用的命名规范
* CSS命名规范（BEM命名）
* 常规名称命名方案，参见EasyAPI中英文翻译
* API接口方法命名，例如getUser，getUserList，createUser，updateUser，deleteUser，其他方法尽量动词在前，例如cancelOrder 取消订单

## 其他说明

* page目录页面命名规范，文件命令简明扼要，例如/pages/api/list.vue表示API列表页，/pages/api/detail.vue表示API详情页，其他还包括edit.vue，info.vue，report.vue
* 如果页面必须是2个单词组成，使用短横线分隔命名，例如文章分类article-category，另外考虑是否可以使用/pages/article/category/list.vue来命名，尽量不使用短横线
* page目录中尽量采用样式表和页面分离开发，例如login文件夹中包含login.vue，login.scss，login.js
* 自定义组建说明，基于成熟的组建进行自定义开发，可平滑升级，打造属于EasyAPI的Vue组件库，以EasyAPI缩写ea为前缀，例如ea-table
* 网络请求已使用axios
* 用户信息等全局变量，必须使用store管理，包括相关api请求放置到modules文件夹下


## 常见问题


**1. 编译失败**

	请使用cnpm试试

**2. 编译成功启动失败**

	请确保网络正常，可提供错误给相关工程师

