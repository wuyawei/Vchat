<template>
    <div class="vchat-item">
        <div class="vchat-item-header">
            <span :class="{active: currNav === i}" v-for="(v, i) in navList" :key="i" @click="setCurrNav(i)" v-if="currSation.type.indexOf(v.type) > -1">{{v.name}}</span>
        </div>
        <div class="vchat-item-container">
            <div class="container-chat">
                <div class="chat-room">
                    <ul ref="msglist">
                        <li :class="[{other: v.type==='other'},{mine: v.type==='mine'},{org: v.type==='org'}]" v-for="(v, i) in chatList" :key="i">
                            <template v-if="v.type==='other'">
                                <div class="mes-box">
                                    <p>
                                        <img :src="IMGURL + v.avatar" alt="">
                                    </p>
                                    <div>
                                        <p>
                                            <span>{{v.nickname}}</span>
                                            <i>{{v.time}}</i>
                                        </p>
                                        <p class="mes">{{v.mes}}</p>
                                    </div>
                                </div>
                            </template>
                            <template v-if="v.type==='mine'">
                                <div class="mes-box">
                                    <div>
                                        <p>
                                            <span>{{v.nickname}}</span>
                                            <i>{{v.time}}</i>
                                        </p>
                                        <p class="mes">{{v.mes}}</p>
                                    </div>
                                    <p>
                                        <img :src="IMGURL + v.avatar" alt="">
                                    </p>
                                </div>
                            </template>
                            <template v-if="v.type==='org'">
                                系统消息：<span>{{v.name}}</span>加入聊天室！
                        </template>
                        </li>
                    </ul>
                </div>
                <div class="chat-send">
                    <div class="tool">
                        <v-icon name="biaoqing1" color="#27cac7" cursor="pointer"></v-icon>
                    </div>
                    <textarea v-model="message" @keyup.enter="send"></textarea>
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
                        <span>群成员 ( 699 )</span>
                        <v-icon class="el-icon-search" color="#fff" :size="18" @clickIcon="spreadInput"></v-icon>
                    </h3>
                    <input type="text" v-show="spread" ref="searchMember">
                    <ul>
                        <li v-for="v in groupUsers" :key="v.userId['_id']">
                            <a class="vchat-photo" :class="{lineOf: !v.status}">
                                <img :src="IMGURL + v.userId.photo" alt="">
                            </a>
                            <span class="vchat-line1">{{v.userId.nickname}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import api from '@/api';
    import utils from '@/utils/utils';
    export default{
        name: 'chatItem',
        props: ['currSation'],
        data() {
            return {
                // type 0 共有 1 群聊 2 好友
                navList: [{name: '聊天', type: 'group,user'}, {name: '公告', type: 'group'}, {name: '聊天记录', type: 'group,user'}],
                IMGURL: process.env.IMG_URL,
                currNav: 0,
                spread: false,
                chatList: [],
                message: '',
                groupUsers: [] // 群成员
            };
        },
        sockets:{
            org(r) {
                this.chatList.push(Object.assign({},r, {type: 'org'}));
            },
            mes(r) {
                if (r.roomid === this.currSation.id) {
                    this.chatList.push(Object.assign({},r, {type: 'other'}));
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
            chatList(list){
                this.$nextTick(_ => {
                    this.$refs['msglist'].scrollTop = this.$refs['msglist'].scrollHeight + 200;
                });
            },
            currSation: { // 当前会话
                handler(v) {
                    if (v) {
                        this.getGroupUsers(v.id);
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
            }
        },
        mounted() {
        },
        methods: {
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
            send() { // 发送消息
                let val = {
                    name: this.user.name,
                    mes: this.message,
                    time: utils.formatTime(new Date()),
                    avatar: this.user.photo,
                    nickname: this.user.nickname,
                    read: [this.user.name],
                    roomid: this.currSation.id
                };
                this.chatList.push(Object.assign({},val,{type: 'mine'}));
                this.$socket.emit('mes', val);
                this.$emit('NewMes', val);
                this.message = '';
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
                color: #cccccc;
                cursor: pointer;
                position: relative;
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
                transition: transform 0.2s;
                transform: scale(0);
            }
            span:hover{
                color: #fff;
            }
            span.active{
                color: #fff;
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
                        padding: 5px;
                        box-sizing: border-box;
                        position: relative;
                        li{
                            width:100%;
                            margin: 10px 0;
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
                            p:nth-of-type(1){
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
                            p:nth-of-type(2){
                                background-color: #27cac7;
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
                            }
                        }
                    }
                    .other .mes-box>div{
                        text-align: left;
                        margin-left: 10px;
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
                        border-bottom: 5px solid #27cac7;
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
                        color: #27cac7;
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
                        i{
                            margin: 0 5px 0 0;
                        }
                    }
                    textarea{
                        width:100%;
                        height: calc(100% - 70px);
                        background-color: transparent;
                        resize: none;
                        outline: none;
                        color: #fff;
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
                    color: #fff;
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
                    color: #d5d5d5;
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
                    color: #fff;
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