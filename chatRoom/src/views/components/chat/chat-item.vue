<template>
    <div class="vchat-item">
        <div class="vchat-item-header">
            <span :class="{active: currNav === v.id}" v-for="(v, i) in navList" :key="i" @click="setCurrNav(v.id)" v-if="v.type.indexOf(currSation.type) > -1">{{v.name}}</span>
        </div>
        <div class="vchat-item-container" v-show="currNav === 0">
            <div class="container-chat">
                <div class="chat-room"
                     v-loading="chatLoading"
                     element-loading-text="拼命加载中"
                     element-loading-spinner="el-icon-loading"
                     element-loading-background="rgba(0, 0, 0, 0.8)"
                >
                    <v-message :chatList="chatList" @lookPhoto="lookPhoto" @chatLoading="chatLoading = false"></v-message>
                </div>
                <div class="chat-send">
                    <div class="tool">
                        <span class="tool-item" v-watchMouse="showEmoji">
                            <v-icon name="biaoqing1" :color="user.chatColor" @clickIcon="showEmoji.f = !showEmoji.f" cursor="pointer" title="发送表情"></v-icon>
                            <el-collapse-transition>
                                <div class="emoji-container" v-show="showEmoji.f">
                                    <emoji @chooseEmoji="chooseEmoji" @chooseEmojiDefault="chooseEmojiDefault"></emoji>
                                </div>
                            </el-collapse-transition>
                        </span>
                        <span class="tool-item">
                            <v-icon name="tupian2" :color="user.chatColor"></v-icon>
                            <input type="file" title="选择图片" @change="InmageChange" ref="chooseInmage" accept="image/png, image/jpeg, image/gif, image/jpg">
                        </span>
                        <span class="tool-item" >
                            <v-upload-popover :visible="uplaodVisible.f" @handleSuccess="uploadFileSuccess" v-watchMouse="uplaodVisible">
                                <v-icon name="wenjian2" :color="user.chatColor" @clickIcon="uplaodVisible.f = !uplaodVisible.f" title="选择文件"></v-icon>
                            </v-upload-popover>
                        </span>
                    </div>
                    <textarea v-model="message" @keyup.enter="send(false)" v-fontColor="user.chatColor"></textarea>
                    <div class="enter">
                        <button class="vchat-button-mini info" @click="clear">清空</button>
                        <button class="vchat-button-mini" @click="send(false)">发送</button>
                    </div>
                </div>
            </div>
            <div class="container-handel" v-if="currSation.type === 'group'">
                <div class="handel-notice">
                    <h3>群通知</h3>
                    <ul>
                        <li class="vchat-line1" title="求star❤❤❤，点击跳转源码"><a href="https://github.com/wuyawei/Vchat" target="_blank" style="color: #fff">期待你的star <i :style="{color: 'red', fontStyle: 'normal'}">❤❤❤</i></a></li>
                    </ul>
                </div>
                <div class="handel-member">
                    <h3>
                        <span>群成员 ( {{onlineNum}}/{{groupUsers.length}} )</span>
                        <v-icon class="el-icon-search" :color="user.chatColor" :size="18" @clickIcon="spreadInput"></v-icon>
                    </h3>
                    <input type="text" v-show="spread" ref="searchMember">
                    <ul>
                        <li v-for="v in groupUserList" :key="v.userId['_id']">
                            <a class="vchat-photo" :class="{lineOf: !v.status}">
                                <img :src="IMG_URL + v.userId.photo" alt="">
                            </a>
                            <span class="vchat-line1">{{v.userId.nickname}}</span>
                        </li>
                        <li>
                            <p class="loadmore" v-if="groupUsers.length > groupUserList.length" @click="loadmore">
                                <v-icon class="el-icon-loading" color="#fff" :size="14" v-if="loadmoreLoading"></v-icon>
                                加载更多</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="vchat-item-container" v-show="currNav === 1">
            努力开发中...
        </div>
        <div class="vchat-item-container" v-show="currNav === 2">
            <message-log :currSation="currSation" :currNav="currNav" @lookPhoto="lookPhoto"></message-log>
        </div>
        <v-photo-swipe :visible="photoSwipeFlag" @close="photoSwipeFlag = false" :url="photoSwipeUrl"></v-photo-swipe>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import api from '@/api';
    import utils from '@/utils/utils';
    import emoji from './emoji.vue';
    import vMessage from './message.vue';
    import messageLog from './messageLog.vue';
    export default{
        name: 'chatItem',
        props: ['currSation'],
        data() {
            return {
                // type 0 共有 1 群聊 2 好友
                navList: [{name: '聊天', type: 'group,friend', id: 0}, {name: '公告', type: 'group', id: 1}, {name: '聊天记录', type: 'group,friend', id: 2}],
                IMG_URL: process.env.IMG_URL,
                currNav: 0,
                spread: false,
                chatList: [],
                message: '',
                showEmoji: {
                    f: false
                },
                groupUsers: [], // 群成员
                uplaodVisible: {  // 上传
                    f: false
                },
                photoSwipeFlag: false, //图片放大器
                photoSwipeUrl: '',
                onlineNum: 0, // 在线人数
                chatLoading: false,
                loadmoreLoading: false,
                groupUserList: [], // 长列表渲染
                offset: 1, // 群成员页码
                limit: 50
            };
        },
        components: {
            emoji,
            vMessage,
            messageLog
        },
        sockets:{
            org(r) {
                if (r.roomid === this.currSation.id) {
                    this.chatList.push(Object.assign({}, r, {type: 'org'}));
                }
            },
            mes(r) {
                if (r.roomid === this.currSation.id) {
                    this.chatList.push(Object.assign({}, r, {type: 'other'}));
                    this.$socket.emit('setReadStatus', {roomid: r.roomid, name: this.user.name});
                    this.$store.commit('setUnRead', {roomid: r.roomid, clear: true});
                }
            },
            getHistoryMessages(r) { // 获取历史消息
                if (r.length) {
                    this.$emit('NewMes', r[r.length - 1]);
                }
                this.chatList = r.map(v => {
                    if (v.type !== 'org') {
                        if (v.name === this.user.name) {
                            v.type = 'mine';
                        } else {
                            v.type = 'other';
                        }
                    }
                    return v;
                });
            }
        },
        computed: {
            ...mapState(['user', 'OnlineUser'])
        },
        watch: {
            currSation: { // 当前会话
                handler(v) {
                    if (!v.id) {
                        this.chatList = [];
                    }
                    this.offset = 1;
                    this.groupUserList = [];
                    this.chatLoading = true;
                    this.currNav = 0; // 标签选中第一个
                    if (v.type === 'group' || v.type === 'friend'){
                        if (v.type === 'group') {
                            this.getGroupUsers(v.id);
                        }
                        this.$socket.emit('setReadStatus', {roomid: v.id, name: this.user.name});
                        this.$store.commit('setUnRead', {roomid: v.id, clear: true});
                        this.$socket.emit('getHistoryMessages', {roomid: v.id, offset: 1, limit: 100});
                    }
                },
                deep: true,
                immediate: true
            },
            OnlineUser: { // 在线成员
                handler(obj) {
                    if (this.currSation.type && this.currSation.type === 'group') {
                        this.getGroupUsers(this.currSation.id);
                    }
                },
                immediate: true,
                deep: true
            },
            currTool(v, old) {
                if (!v) {
                    document.documentElement.removeEventListener('click', this.watchMouse);
                }
            }
        },
        mounted() {
        },
        methods: {
            lookPhoto(url) { // 查看原图
                this.photoSwipeUrl = url;
                this.photoSwipeFlag = true;
            },
            uploadFileSuccess(res, file) { // 上传成功
                if (file.raw.type.indexOf('image') > -1) {
                    this.send(res.data, 'img');
                } else {
                    this.send(file, 'file');
                }
                this.uplaodVisible.f = false;
            },
            InmageChange() { // 发送图片
                let f = this.$refs['chooseInmage'].files[0];
                if (f.type.indexOf('image') === -1) {
                    this.$message.error('只能上传图片!');
                    return;
                }
                const isLt1M = f.size / 1024 / 1024 < 1;
                if (!isLt1M) {
                    this.$message.error('图片大小不能超过 1MB!');
                    return;
                }
                let formdata = new FormData();
                formdata.append('f', f);
                api.uploadFile(formdata).then(r => {
                    if (r.code === 0) {
                        this.send(r.data, 'img');
                    } else {
                        this.$message({
                            message: '上传失败',
                            type: 'warning'
                        })
                    }
                });
                this.$refs['chooseInmage'].value = '';
            },
            getGroupUserStatus(obj) { // 群成员在线状态
                this.groupUsers.forEach((v, i) => {
                    let flag = false;
                    Object.keys(obj).forEach(k => {
                        if (k === v.userName) {
                            flag = true;
                        }
                    });
                    this.$set(this.groupUsers, i, Object.assign({}, v, {status: flag}));
                });
                this.onlineNum = this.groupUsers.filter(v => v.status).length;
            },
            setCurrNav(i) {
                this.currNav = i;
            },
            spreadInput() {
                this.spread = !this.spread;
                this.$nextTick(_ => {
                    this.$refs['searchMember'].focus();
                });
            },
            loadmore() {
                this.loadmoreLoading = true;
                this.offset += 1;
                setTimeout(v => {
                    let page = (this.offset - 1) * this.limit;
                    this.groupUserList = this.groupUserList.concat(this.groupUsers.slice(page, page + this.limit));
                    this.loadmoreLoading = false;
                }, 1000);
            },
            getGroupUsers(id) { // 获取群成员
                let params = {
                    groupId: id
                };
                api.getGroupUsers(params).then(r => {
                    if (r.code === 0) {
                        this.groupUsers = r.data;
                        let page = (this.offset - 1) * this.limit;
                        this.groupUserList = this.groupUsers.slice(page, page + this.limit);
                        /*console.log(this.groupUsers);*/
                        this.getGroupUserStatus(this.OnlineUser);
                    }
                })
            },
            send(params, type = 'mess') { // 发送消息
                if (!this.message && !params) {
                    return;
                }
                let val = {
                    name: this.user.name,
                    mes: this.message,
                    time: utils.formatTime(new Date()),
                    avatar: this.user.photo,
                    nickname: this.user.nickname,
                    read: [this.user.name],
                    roomid: this.currSation.id,
                    style: 'mess',
                    userM: this.user.id
                };
                if (type === 'emoji') { // 发送表情
                    val.style =  'emoji';
                    val.mes = '表情';
                    val.emoji = params;
                } else if (type === 'img') {
                    val.style =  'img';
                    val.mes = '图片';
                    val.emoji = params;
                } else if (type === 'file') {
                    val.style =  'file';
                    val.mes = params.name;
                    val.emoji = params.response.data;
                }
                this.chatList.push(Object.assign({},val,{type: 'mine'}));
                this.$socket.emit('mes', val);
                this.$emit('NewMes', val);
                if (type === 'mess') { // 发送文字
                    this.message = '';
                }
            },
            chooseEmojiDefault(em) {
                this.message += em;
                this.showEmoji.f = false;
            },
            chooseEmoji(url) {
                this.send(url, 'emoji');
                this.showEmoji.f = false;
            },
            clear() { // 清空
                this.message = '';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-item{
        width:100%;
        height: 100%;
        .vchat-item-header{
            width:100%;
            height: 32px;
            text-align: left;
            font-size: 16px;
            padding: 0 10px;
            box-sizing: border-box;
            background-color: rgba(0,0,0,0.2);
            span{
                display: inline-block;
                height: 100%;
                line-height: 32px;
                padding: 0 5px;
                margin-right: 10px;
                box-sizing: border-box;
                cursor: pointer;
                position: relative;
                opacity: 0.8;
                overflow: hidden;
            }
            span:before{
                content: '';
                display: block;
                width:100%;
                height: 2px;
                background-color: #f5f5f5;
                position: absolute;
                left:0;
                bottom:0;
                /*transition: transform 0.2s;*/
                transform: scale(0);
            }
            span:hover, span.active{
                opacity: 1;
            }
            span.active:before{
                transform: scale(1);
            }
        }
        .vchat-item-container{
            width:100%;
            height: calc(100% - 32px);
            display: flex;
            justify-content: flex-start;
            .container-chat{
                width:100%;
                height: 100%;
                min-width: 423.936px;
                box-sizing: border-box;
                border-right: 1px solid rgba(255,255,255,0.3);
                .chat-room {
                    width: 100%;
                    height: 65%;
                    min-height: 252.2px;
                    box-sizing: border-box;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
                    overflow: hidden;
                }
                .message-content{
                    width: 100%;
                    height: 100%;
                }
                .chat-send{
                    width:100%;
                    height: 35%;
                    min-height: 135.8px;
                    box-sizing: border-box;
                    .tool{
                        width:100%;
                        height: 28px;
                        line-height: 28px;
                        text-align: left;
                        background-color: rgba(0,0,0,0.3);
                        padding: 0 10px;
                        box-sizing: border-box;
                        .tool-item{
                            display: inline-block;
                            height: 100%;
                            position: relative;
                            i{
                                padding: 0 5px;
                            }
                            .emoji-container{
                                width:400px;
                                height: 260px;
                                position: absolute;
                                bottom: 30px;
                                left:0;
                                z-index: 10;
                                transition: all 0.2s;
                                /*transform: scaleX(0);*/
                                /*opacity: 0;*/
                            }
                            input{
                                position: absolute;
                                left:0;
                                top:0;
                                width:100%;
                                height: 100%;
                                opacity: 0;
                            }
                        }
                        .tool-item:hover{
                            background-color: rgba(255,255,255,0.3);
                        }
                        .tool-item.active{
                            background-color: rgba(255,255,255,0.3);
                        }
                        .tool-item.active .emoji-container{
                            transform: scaleX(1);
                            opacity: 1;
                        }
                        i{
                            margin: 0;
                        }
                    }
                    textarea{
                        width:100%;
                        height: calc(100% - 70px);
                        background-color: transparent;
                        resize: none;
                        outline: none;
                        font-size: 14px;
                        padding: 5px 10px;
                        box-sizing: border-box;
                        border: none;
                    }
                    .enter{
                        width:100%;
                        height: 32px;
                        display: flex;
                        justify-content: flex-end;
                        button{
                            margin-right: 10px;
                        }
                    }
                }
            }
            .container-handel{
                width:28%;
                min-width: 164.864px;
                height: 100%;
                h3{
                    font-weight: normal;
                    font-size: 16px;
                    text-align: left;
                    line-height: 16px;
                    margin-bottom: 5px;
                    i{
                        float: right;
                    }
                }
                .handel-notice{
                    width:100%;
                    height: 40%;
                    box-sizing: border-box;
                    border-bottom: 1px solid rgba(255,255,255,0.3);
                    padding: 8px 10px;
                    overflow-y: auto;
                    font-size: 12px;
                    text-align: left;
                    ul{
                        overflow-y: auto;
                        li{
                            margin-bottom: 2px;
                        }
                        li:hover{
                            padding: 2px;
                            box-sizing: border-box;
                            background-color: rgba(255,255,255,0.5);
                            cursor: default;
                        }
                    }
                }
                .handel-member{
                    width:100%;
                    height: 60%;
                    box-sizing: border-box;
                    padding: 8px 10px;
                    font-size: 12px;
                    ul{
                        overflow-y: auto;
                        height: 100%;
                    }
                    input{
                        box-sizing: border-box;
                        width:100%;
                        border: 1px solid #d5d5d5;
                        padding-left: 5px;
                        outline: none;
                        color: #323232;
                    }
                    li{
                        padding: 5px 0;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        span{
                            min-width: 110px;
                            text-align: left;
                        }
                    }
                    li:last-child{
                        padding-bottom: 20px;
                    }
                    .loadmore{
                        width: 100%;
                        text-align: center;
                        cursor: pointer;
                    }
                    a{
                        width:26px;
                        min-width: 26px;
                        height: 26px;
                        margin-right: 5px;
                    }
                    a.lineOf{
                        -webkit-filter: grayscale(85%); /* Chrome, Safari, Opera */
                        filter: grayscale(85%);
                    }
                }
            }
        }
    }
</style>