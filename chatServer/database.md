##表设计
### users 用户表
* name 账号
* pass 密码
* avatar 头像
* signature 个性签名
* nickname 昵称
* email 邮件
* phone 手机
* sex 性别
* bubble 气泡
* chatTheme 聊天主题
* projectTheme 项目主题
* wallpaper 聊天壁纸
* signUpTime 注册时间
* lastLoginTime 最后一次登录时间
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
