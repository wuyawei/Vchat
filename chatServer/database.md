##表设计
### users 用户表
* name 账号
* pass 密码
* photo 头像
* id 主键
### rooms 群聊
* id 主键
* title 名称
* desc 简介
* img 群头像
### roomUser 群成员
* id
* roomid 
* userid
### frendly 好友
* id
* userAid
* userBid
### message 消息
* id
* roomid
* roomtitle
* userid
* username
* content
