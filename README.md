vue-manger
====
使用vue+express+mongodb实现的一个管理员信息界面</br>
为了成功走通流程，需要有前台用户点击详情，所以需要添加一些前台页面</br>
## 简单介绍
这是一个单页面，具体功能有：</br>
信息的展示、添加、删除、更改；</br>
管理的登陆和管理员对信息的收藏；</br>
对模块进行统计，通图标显示出哪个模块是查看最多的，哪个模块是收藏最多的；
## 技术
前台：vue+vue-router+vue-resource+bootstrap+bootstrap-table</br>
后台：express+multer(上传文件)</br>
数据库：mongodb+studio 3T</br>
## 运行
目前只是开发环境，并没有对代码进行build</br>
在vue-manger运行npm run dev</br>
在vue-manger中的server(放置后台代码文件)运行node index
## 了解代码
了解基本的前后台的交互：[地址](http://www.cnblogs.com/GainLoss/p/6927626.html "步骤地址")
## 说明
这个例子和之前vue-node-mangodb技术是一样的，基本上实现也是一样的，就是一个是主要是针对用户的界面，一个主要是针对管理员的界面
也可以看看这个例子 [地址](https://github.com/GainLoss/vue-node-mongodb "地址")


