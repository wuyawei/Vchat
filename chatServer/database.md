##表设计
### users 用户表
* name 账号
* pass 密码
* photo 头像
* signature 个性签名
* id 主键
### groups 群聊
* id 主键
* title 名称
* desc 简介
* img 群头像
### groupUser 群成员
* id
* roomid 群
* userName 用户名
* manager 管理员 0/1
* holder 群主 0/1
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
