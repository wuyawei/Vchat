<template>
    <div class="vchat-item">
        <div class="vchat-item-header">
            <span :class="{active: currNav === v.id}" v-for="(v, i) in navList" :key="i" @click="setCurrNav(v.id)" v-if="v.type.indexOf(currSation.type) > -1">{{v.name}}</span>
        </div>
        <div class="vchat-item-container" v-show="currNav === 0">
            <div class="container-chat">
                <div class="chat-room">
                    <ul ref="msglist">
                        <li :class="[{other: v.type==='other'},{mine: v.type==='mine'},{org: v.type==='org'}]" v-for="(v, i) in chatList" :key="i">
                            <template v-if="v.type==='other'">
                                <div class="mes-box">
                                    <p>
                                        <img :src="IMG_URL + v.avatar" alt="">
                                    </p>
                                    <div>
                                        <p class="info">
                                            <span>{{v.nickname}}</span>
                                            <i>{{v.time}}</i>
                                        </p>
                                        <p v-if="v.style === 'emoji'" class="emoji">
                                            <img :src="IMG_URL + v.emoji" alt="">
                                        </p>
                                        <p v-if="v.style === 'img'" class="image">
                                            <img :src="IMG_URL + v.emoji" alt="" @dblclick="lookPhoto(v.emoji)" title="双击查看原图">
                                        </p>
                                        <div v-if="v.style === 'file'" class="file">
                                            <img src="../../../assets/img/file.png" alt="">
                                            <div>
                                                <p :title="v.mes">{{v.mes.lastIndexOf('.') > 12 ? v.mes.slice(0, 12) + '...' + v.mes.slice(v.mes.lastIndexOf('.')) : v.mes}}</p>
                                                <a :href="v.emoji" download>下载</a>
                                            </div>
                                        </div>
                                        <p class="mes" v-if="v.style === 'mess'">{{v.mes}}</p>
                                    </div>
                                </div>
                            </template>
                            <template v-if="v.type==='mine'">
                                <div class="mes-box">
                                    <div>
                                        <p class="info">
                                            <span>{{v.nickname}}</span>
                                            <i>{{v.time}}</i>
                                        </p>
                                        <p v-if="v.style === 'emoji'" class="emoji">
                                            <img :src="IMG_URL + v.emoji" alt="">
                                        </p>
                                        <p v-if="v.style === 'img'" class="image">
                                            <img :src="IMG_URL + v.emoji" alt="" @dblclick="lookPhoto(v.emoji)" title="双击查看原图">
                                        </p>
                                        <div v-if="v.style === 'file'" class="file">
                                            <img src="../../../assets/img/file.png" alt="">
                                            <div>
                                                <p :title="v.mes">{{v.mes.lastIndexOf('.') > 12 ? v.mes.slice(0, 12) + '...' + v.mes.slice(v.mes.lastIndexOf('.')) : v.mes}}</p>
                                                <p>
                                                    发送成功
                                                    <v-icon class="el-icon-circle-check-outline" color="#67C23A"></v-icon>
                                                </p>
                                            </div>
                                        </div>
                                        <p class="mes"  v-if="v.style === 'mess'">{{v.mes}}</p>
                                    </div>
                                    <p>
                                        <img :src="IMG_URL + v.avatar" alt="">
                                    </p>
                                </div>
                            </template>
                            <template v-if="v.type==='org'">
                                系统消息：<span>{{v.nickname}}</span>加入群聊！
                        </template>
                        </li>
                    </ul>
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
                    <textarea v-model="message" @keyup.enter="send" v-fontColor="user.chatColor"></textarea>
                    <div class="enter">
                        <button class="vchat-button-mini info" @click="clear">清空</button>
                        <button class="vchat-button-mini" @click="send">发送</button>
                    </div>
                </div>
            </div>
            <div class="container-handel" v-if="currSation.type === 'group'">
                <div class="handel-notice">
                    <h3>群通知</h3>
                    <ul>
                        <li class="vchat-line1">【本群须知】嗨起来 </li>
                        <li class="vchat-line1">【公告】哈哈哈哈哈 </li>
                    </ul>
                </div>
                <div class="handel-member">
                    <h3>
                        <span>群成员 ( {{groupUsers.length}} )</span>
                        <v-icon class="el-icon-search" :color="user.chatColor" :size="18" @clickIcon="spreadInput"></v-icon>
                    </h3>
                    <input type="text" v-show="spread" ref="searchMember">
                    <ul>
                        <li v-for="v in groupUsers" :key="v.userId['_id']">
                            <a class="vchat-photo" :class="{lineOf: !v.status}">
                                <img :src="IMG_URL + v.userId.photo" alt="">
                            </a>
                            <span class="vchat-line1">{{v.userId.nickname}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="vchat-item-container" v-show="currNav === 2">
            努力开发中...
        </div>
        <v-photo-swipe :visible="photoSwipeFlag" @close="photoSwipeFlag = false" :url="photoSwipeUrl"></v-photo-swipe>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import api from '@/api';
    import utils from '@/utils/utils';
    import emoji from './emoji.vue';
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
                photoSwipeUrl: ''
            };
        },
        components: {
            emoji
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
                    if (v.name === this.user.name) {
                        v.type = 'mine';
                        return v;
                    } else {
                        v.type = 'other';
                        return v;
                    }
                })
            }
        },
        computed: {
            ...mapState(['user', 'OnlineUser'])
        },
        watch: {
            chatList(){
                this.$nextTick(_ => {
                    this.$refs['msglist'].scrollTop = this.$refs['msglist'].scrollHeight + 200;
                });
            },
            currSation: { // 当前会话
                handler(v) {
                    if (v.type === 'group' || v.type === 'friend') {
                        if (v.type === 'group') {
                            this.getGroupUsers(v.id);
                        }
                        this.$socket.emit('setReadStatus', {roomid: v.id, name: this.user.name});
                        this.$store.commit('setUnRead', {roomid: v.id, clear: true});
                        this.$socket.emit('getHistoryMessages', {roomid: v.id});
                    }
                },
                deep: true,
                immediate: true
            },
            OnlineUser: { // 在线成员
                handler(obj) {
                    this.getGroupUserStatus(obj);
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
                    let k, flag = false;
                    for (k in obj) {
                        if (k === v.userName) {
                            flag = true;
                        }
                    }
                    this.$set(this.groupUsers, i, Object.assign({}, v, {status: flag}));
                })
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
            getGroupUsers(id) { // 获取群成员
                let params = {
                    groupId: id
                };
                api.getGroupUsers(params).then(r => {
                    if (r.code === 0) {
                        this.groupUsers = r.data;
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
                .chat-room{
                    width:100%;
                    height: 65%;
                    min-height: 252.2px;
                    box-sizing: border-box;
                    border-bottom: 1px solid rgba(255,255,255,0.3);
                    overflow-y: auto;
                    ul{
                        width:100%;
                        height: 100%;
                        overflow-y: auto;
                        padding: 5px 10px;
                        box-sizing: border-box;
                        position: relative;
                        li{
                            width:100%;
                            margin: 15px 0;
                        }
                    }
                    .mes-box{
                        width:350px;
                        display: flex;
                        >p{
                            width:42px;
                            height: 42px;
                            color: #fff;
                            font-size: 14px;
                            text-align: center;
                            line-height: 42px;
                            border-radius: 50%;
                            overflow: hidden;
                            img{
                                width:100%;
                            }
                        }
                        >div{
                            max-width:298px;
                            p.info{
                                font-size: 14px;
                                color: #f5f5f5;
                                margin-bottom: 5px;
                                i{
                                    font-size: 10px;
                                    color: #b3b3b3;
                                    font-style: normal;
                                    margin-left: 5px;
                                }
                            }
                            p.mes{
                                background-color: #acd9f8;
                                border-radius: 5px;
                                padding: 10px;
                                box-sizing: border-box;
                                position: relative;
                                text-align: left;
                                word-wrap:break-word;
                                font-size: 14px;
                                word-break: break-all;
                                color: #fff;
                                display: inline-block;
                                color: #323232;
                            }
                            p.emoji{
                                max-width: 160px;
                                overflow: hidden;
                                border-radius: 5px;
                                img{
                                    width:100%;
                                }
                            }
                            p.image{
                                max-width: 300px;
                                overflow: hidden;
                                border-radius: 5px;
                                img{
                                    width:100%;
                                }
                            }
                            div.file{
                                width:300px;
                                height: 80px;
                                display: flex;
                                justify-content: flex-start;
                                align-content: center;
                                color: #323232;
                                background-color: #fff;
                                text-align: left;
                                padding: 10px;
                                box-sizing: border-box;
                                border-radius: 5px;
                                img{
                                    width:60px;
                                    height: 60px;
                                    margin-right: 10px;
                                }
                                p:nth-of-type(1){
                                    font-size: 16px;
                                    margin-bottom: 8px;
                                }
                                p:nth-of-type(2){
                                    font-size: 12px;
                                    line-height: 13px;
                                    color: #888;
                                    i{
                                        vertical-align: text-bottom;
                                    }
                                }
                                a{
                                    color: #27cac7;
                                    font-size: 12px;
                                }
                            }
                        }
                    }
                    .other .mes-box>div{
                        text-align: left;
                        margin-left: 10px;
                        p.emoji{
                            margin-left: 20px;
                        }
                    }
                    .other .mes-box{
                        justify-content: flex-start;
                    }
                    .mine .mes-box{
                        justify-content: flex-end;
                    }
                    .mine .mes-box>div{
                        text-align: right;
                        margin-right: 10px;
                        p.emoji{
                            margin-right: 20px;
                        }
                    }
                    .mine{
                        display: flex;
                        justify-content: flex-end;
                    }
                    .other .mes-box>div p.mes{
                        background-color: #9cbeca;
                    }
                    .other p.mes:before, .mine p.mes:after{
                        width:0;
                        height:0;
                        content: '';
                        display: block;
                        position:absolute;
                        top:10px;
                    }
                    .other p.mes:before{
                        left:-11px;
                        border-bottom: 5px solid #9cbeca;
                        border-left: 10px solid transparent;
                        border-right: 5px solid transparent;
                        border-top: 0;
                        transform: rotate(45deg);
                    }
                    .mine p.mes:after{
                        right:-10px;
                        border-bottom: 5px solid #acd9f8;
                        border-left: 5px solid transparent;
                        border-right: 10px solid transparent;
                        transform: rotate(-45deg);
                    }
                    .org{
                        width:100%;
                        margin: 20px 0;
                        font-size: 12px;
                        color: #e4e4e4;
                        box-sizing: border-box;
                    }
                    .org span{
                        color: rgb(164, 245, 231);
                        margin: 0 5px;
                    }
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