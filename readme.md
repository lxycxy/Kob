# King of bot

**一个利用代码或手动控制蛇与玩家进行对战的游戏**

*原版WEB端项目在 web目录下*
*新版优化后的WEB端项目在kob-web下，新版UI加入tailwind css，ant-design（后续会去除），去除了Bootstrap*


## 完成度
- 后端API已完全实现
- 使用canvas完成了手动地控制蛇
- 通过websocket，成了匹配池以及对战

## 待优化
- 回放页面刷新之后，地图消失（vuex在刷新之后就会清空，持久化时由于存在Json循环，无法持久化）
- 部分地方布局不够好
- 后端只支持运行java代码，后续考虑加入Leetcode式的代码运行
