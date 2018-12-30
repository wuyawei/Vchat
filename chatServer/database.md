##表设计
### accountBase 号码池
* code 号码
* status 号码状态 1 已使用 0 未使用
* type 账户类型 1 用户 2 群聊
* special 特殊标识  （待定，靓号等）
* random (随机数索引，用于随机查找一条)
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
* projectTheme 项目主题
* wallpaper 聊天壁纸
* signUpTime 注册时间
* lastLoginTime 最后一次登录时间
* chatColor 聊天文字颜色
* bgOpa 聊天窗口透明度
* province 省
* city 市
* town 县
* conversationsList 会话列表
       * name 会话名称
       * photo 会话头像
       * id 会话id
       * type 会话类型 group/ frend
* id 主键
* cover 封面列表
### groups 群聊
* id 主键
* title 名称
* desc 简介
* img 群头像
* code 群账号
* createDate 创建时间
* userNum 成员数
* grades 等级
* holderName 群主账号
### groupUser 群成员
* id
* roomid 群
* userName 用户名
* manager 管理员 0/1
* holder 群主 0/1
* card 群名片
### friendlies 好友
* id
* userM
* userY
* createDate 创建时间
### messages 消息
* id
* roomid 房间id
* name 用户登录名
* nickname 用户昵称
* time 时间
* avatar 用户头像
* mes 消息
* read 是否已读 Array ['www', 'yyy']
