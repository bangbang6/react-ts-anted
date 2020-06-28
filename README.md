## Vikingship component library
## 使用 React+typescript 从零到一打造一套你自己的组件库

[![Build Status](https://travis-ci.com/vikingmute/vikingship.svg?token=mHoDqxyxXWX5BSpu8L9y&branch=master)](https://travis-ci.com/vikingmute/vikingship)

vikingship 使用 React Hooks 和 typescript
意在让大家从零到一封装一个组件库，它的官网地址是
[vikingship.xyz](http://vikingship.xyz)


### 安装最后已经发布的组件库来试试

~~~javascript
npm install vikingship --save
~~~

### 使用

~~~javascript
// 加载样式
import 'vikingship/dist/index.css'
// 引入组件
import { Button } from 'vikingship'
~~~


### 一些本地开发命令

~~~bash
//启动本地环境
npm run stroybook

//跑单元测试
npm test

//build可发布静态文件
npm run build

//发布到 npm
npm run publish
~~~
