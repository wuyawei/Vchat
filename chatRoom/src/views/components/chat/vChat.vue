<template>
    <div class="vchat-chatRoom" v-bgInmage="user.wallpaper.split(',')[0]" v-fontColor="user.chatColor">
        <div class="vchat-chatRoom-bg">
            <div class="chat-header">
                <a v-fontColor="user.chatColor">{{currSation.name}}</a>
                <div class="chat-handel">
                    <v-icon class="el-icon-minus" :color="user.chatColor" cursor="pointer" @clickIcon="close"></v-icon>
                    <v-icon class="el-icon-setting" :color="user.chatColor" cursor="pointer" @clickIcon="settingFlag.f = true"></v-icon>
                </div>
            </div>
            <div class="chat-container">
                <ul class="chat-conversation-ul">
                    <li class="chat-conversation-li" v-for="(v, i) in contactsList" :key="v.id" :class="{active: currSation.id === v.id}" @click="setCurrSation(v)">
                        <el-badge :value="v.unRead" :max="99" class="mesBadge" :hidden="v.unRead === 0">
                            <a class="vchat-photo">
                                <img :src="IMGURL + v.photo" alt="">
                            </a>
                        </el-badge>
                        <div class="chat-conversation-li-center">
                            <template v-if="v.type === 'vchat'">
                                <p class="vchat-line1">{{v.nickname}}</p>
                                <p class="vchat-line1">{{v.signature}}</p>
                            </template>
                            <template v-else>
                                <p class="vchat-line1">{{v.name}}</p>
                                <p class="vchat-line1">{{v.newMes}}</p>
                            </template>
                        </div>
                        <div class="chat-conversation-li-right">
                            <p>{{v.newMesTime}}</p>
                        </div>
                        <p class="delete" @click.stop="remove(v, i)">
                            <el-tooltip class="item" effect="dark" :content="v.type === 'vchat' ? '从会话列表移除' : '从列表移除后，需要再次添加才能收到消息！'" placement="top-start">
                                <v-icon class="el-icon-circle-close" :color="user.chatColor" cursor="pointer" :size="18"></v-icon>
                            </el-tooltip>
                        </p>
                    </li>
                </ul>
                <div class="chat-content-box">
                    <chat-item :currSation="currSation" @NewMes="getNewMes" v-show="currSation.type !== 'vchat'"></chat-item>
                    <vchat-message v-show="currSation.type === 'vchat'" :currSation="currSation"></vchat-message>
                </div>
            </div>
            <div class="chat-setting" :class="{active: settingFlag.f}" v-watchMouse="settingFlag">
                <h3>聊天设置</h3>
                <v-icon class="el-icon-circle-close-outline deClose" @clickIcon="settingFlag.f = false" color="#323232" :size="24" cursor="pointer"></v-icon>
                <h5>聊天壁纸</h5>
                <ul class="bg">
                    <li class="bg-li" v-for="(v, i) in bgList" :key="i" v-bgInmage="v.url">
                        <p @click="setChatBg(v)">{{v.name}}</p>
                        <v-icon class="el-icon-circle-check-outline" color="rgb(80, 243, 0)" v-if="user.wallpaper.split(',')[0] === v.url"></v-icon>
                    </li>
                    <li class="upload-btn">
                        上传
                        <input type="file" @change="fileChange" ref="wallpaperFile" accept="image/png, image/jpeg, image/gif, image/jpg">
                    </li>
                </ul>
                <h5>文字颜色</h5>
                <p class="isColor-container">
                    <span>当前颜色:</span>
                    <span class="isColor" v-bgColor="user.chatColor">{{user.chatColor}}</span>
                </p>
                <div class="color-container">
                    <span v-for="(v, i) in colorList" :key="i" v-bgColor="v" class="colorList" @click="setFontColor(v)">{{v}}</span>
                    <span v-bgColor="chooseColor" class="colorList">
                        自定义
                        <input type="color" v-model="chooseColor" @change="colorChange">
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import chatItem from './chat-item.vue';
    import vchatMessage from './vchatMessage.vue';
    import { mapState } from 'vuex';
    import api from '@/api';
    export default{
        name: 'vChat',
        data() {
            return {
                currSation: {}, //当前会话
                contactsList: [], // 会话列表
                IMGURL: process.env.IMG_URL,
                one: true,
                settingFlag: { // 设置面板
                    f: false
                },
                colorList: ['#96d0a5', '#b4d9ce', '#dbf2e0', '#94cad7', '#f6c8ca'],
                chooseColor: '#ffffff', // 自定义颜色
            }
        },
        sockets:{
        },
        components: {
            chatItem,
            vchatMessage
        },
        watch: {
            conversationsList: {
                handler(list) {
                    this.contactsList = JSON.parse(JSON.stringify(list));
                    if (this.one && list.length) {
                        this.one = false;
                        this.currSation = this.contactsList[0];
                    }
                    if (!list.length) {
                        this.currSation = {};
                    }
                },
                deep: true,
                immediate: true
            },
            contactsList: {
                handler(list) {
                    if (!list.length) {
                        this.currSation = {};
                    }
                },
                deep: true
            },
            unRead: {
                handler(list) {
                    this.contactsList.forEach((v, i) => {
                        list.forEach(m => {
                            if (v.id === m.roomid) {
                                this.$set(this.contactsList, i, Object.assign({}, v, {unRead: m.count}));
                            }
                        });
                    })
                },
                deep: true,
                immediate: true
            }
        },
        computed: {
            ...mapState(['user', 'conversationsList', 'unRead']),
            bgList() {
                return [{name: '远方', url: '/img/wallpaper.jpg', id: 1}, {name: '昨日青空', url: '/img/0055.jpg', id: 2}, {name: '自定义', url: this.user.wallpaper.split(',')[1] || '', id: 3}];
            }
        },
        methods: {
            colorChange() {
                this.upUserInfo({chatColor: this.chooseColor});
            },
            setFontColor(color) {
                this.upUserInfo({chatColor: color});
            },
            fileChange() {
                let f = this.$refs['wallpaperFile'].files[0];
                const isLt1M = f.size / 1024 / 1024 < 1;
                if (!isLt1M) {
                    this.$message.error('图片大小不能超过 1MB!');
                    this.$refs['wallpaperFile'].value = '';
                    return;
                }
                let formdata = new FormData();
                formdata.append('f', f);
                api.uploadFile(formdata).then(r => {
                    if (r.code === 0) {
                        let params = {
                            wallpaper:  r.data + ',' + r.data
                        };
                        if (this.user.wallpaper.split(',')[1]) {
                            params.unlink = this.user.wallpaper.split(',')[1];
                        }
                        api.upUserInfo(params).then(res => {
                            if (res.code === 0) {
                                this.$store.commit('setUser', { wallpaper: r.data + ',' + r.data });
                                this.$message({
                                    message: '上传成功',
                                    type: 'success'
                                })
                            } else {
                                this.$message({
                                    message: '上传失败',
                                    type: 'warning'
                                })
                            }
                        })
                    } else {
                        this.$message({
                            message: '上传失败',
                            type: 'warning'
                        })
                    }
                });
                this.$refs['wallpaperFile'].value = '';
            },
            setChatBg(v) { // 设置壁纸
                if (this.user.wallpaper.split(',')[0] === v.url || !v.url) {
                    return;
                }
                let params = {
                    wallpaper: v.url + ',' + this.user.wallpaper.split(',')[1] || ''
                };
                this.upUserInfo(params);
            },
            upUserInfo(params) {
                api.upUserInfo(params).then(r => {
                    if (r.code === 0) {
                        this.$store.commit('setUser', params);
                        this.$message({
                            message: '设置成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: '设置失败',
                            type: 'warning'
                        })
                    }
                });
            },
            close() {
                this.$emit('closeChat');
            },
            setCurrSation(v) {
                this.currSation = v;
            },
            getNewMes(m) { // 获取最新一条消息
                this.contactsList.forEach((v, i) => {
                    if (v.id === m.roomid) {
                        this.$set(this.contactsList, i, Object.assign({}, v, {newMes: m.mes, newMesTime: m.time.split(' ')[1]}));
                    }
                })
            },
            remove(v, i) {
                if (v.type === 'vchat') { // 只做显示列表移除
                    this.contactsList = this.contactsList.filter(m => m.id !== v.id);
                    if (this.currSation.id === v.id && this.contactsList.length !== 0) {
                        this.currSation = this.contactsList[i - 1];
                    }
                } else {
                    api.removeConversitionList(v).then(r => {
                        if (r.code === 0) {
                            this.$message({
                                type: 'success',
                                message: '移除成功'
                            });
                            this.$store.commit('setConversationsList', Object.assign({}, v, {d: true}));
                            if (this.currSation.id === v.id && this.conversationsList.length !== 0) {
                                this.currSation = this.conversationsList[i - 1];
                            }
                        } else {
                            this.$message({
                                type: 'success',
                                message: '移除失败'
                            });
                        }
                    })
                }
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-chatRoom{
        width:100%;
        height: 100%;
        border-radius: 3px;
        overflow: hidden;
        position: relative;
        &:before{
            content: '';
            display: block;
            position: absolute;
            left:0;
            top:0;
            width:100%;
            height: 100%;
            background-color: rgba(0,0,0,0.2);
            z-index: 1;
        }
        .vchat-chatRoom-bg{
            position: absolute;
            left:0;
            top:0;
            width:100%;
            height: 100%;
            z-index: 2;
        }
        .chat-header{
            width:100%;
            height: 40px;
            text-align: center;
            position: relative;
            line-height: 40px;
            box-sizing: border-box;
            border-bottom: 1px solid rgba(255,255,255,0.2);
            font-size: 16px;
            a{
                color: #fff;
                padding: 2px 5px;
                display: inline-block;
            }
            .chat-handel{
                position: absolute;
                right: 0;
                top:0;
                padding-right: 15px;
                i{
                    padding: 8px 4px 3px;
                }
                i:hover{
                    background-color: rgba(255,255,255,0.5);
                }
            }
        }
        .chat-container{
            width:100%;
            height: calc(100% - 40px);
            display: flex;
            justify-content: flex-start;
            .chat-conversation-ul{
                width:20%;
                min-width:147.2px;
                padding-bottom: 20px;
                box-sizing: border-box;
                border-right: 1px solid rgba(255,255,255,0.2);
                overflow-y: auto;
            }
            .chat-conversation-li{
                padding: 10px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                overflow: hidden;
                text-align: left;
                position: relative;
                a{
                    width:42px;
                    min-width: 42px;
                    height: 42px;
                    margin-right: 10px;
                }
                .delete{
                    position: absolute;
                    right: 5px;
                    top:32px;
                    border-radius: 50%;
                    width:18px;
                    height: 18px;
                    line-height: 18px;
                    text-align: center;
                    /*transition: transform 0.3s;*/
                    transform: scale(0);
                    i{
                        margin: 0;
                    }
                    i:hover{
                        color: #FF3255 !important;
                    }
                }
            }
            .chat-conversation-li-center{
                min-width: 100px;
                font-size: 14px;
                p{
                    margin-bottom: 5px;
                }
                p:nth-of-type(2) {
                    font-size: 12px;
                }
            }
            .chat-conversation-li-right{
                min-width: 36px;
                font-size: 12px;
                text-align: right;
                p{
                    margin-bottom: 5px;
                }
            }
            .chat-conversation-li:hover, .chat-conversation-li.active{
                background-color: rgba(255,255,255,0.2);
            }
            .chat-conversation-li:hover .delete{
                transform: scale(1);
            }
            .chat-content-box{
                width: 80%;
                min-width: 588.8px;
                box-sizing: border-box;
            }
        }
        .chat-setting{
            position: absolute;
            right:0;
            top:0;
            width:250px;
            height: 500px;
            background-color: #f5f5f5;
            transition: transform 0.3s;
            transform: translateX(100%);
            z-index: 15;
            border-radius: 5px 2px 0 5px;
            box-shadow: -1px 0 5px #bdafaf;
            overflow-y: auto;
            color: #111;
            h3{
                height: 36px;
                line-height: 36px;
                color: #111;
                background-color: #eef5eb;
            }
            h5{
                text-align: left;
                margin: 5px 5px 10px 5px;
                border-bottom: 1px solid #d5d5d5;
                padding-bottom: 5px;
            }
            .deClose{
                position: absolute;
                right: 5px;
                top:5px;
                opacity: 0.7;
            }
            .deClose:hover{
                opacity: 1;
            }
            .bg{
                width: 100%;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                box-sizing: border-box;
                li.bg-li{
                    width: 117px;
                    height: 70px;
                    background-color: #fff;
                    border-radius: 2px;
                    box-shadow: 0 0 1px #bdafaf;
                    font-size: 14px;
                    line-height: 70px;
                    color: #fff;
                    position: relative;
                    margin: 4px;
                    p{
                        background-color: rgba(0,0,0,0.2);
                    }
                    i{
                        position: absolute;
                        right: 0;
                        top:0;
                    }
                }
                li.upload-btn{
                    color: #28ca8b;
                    position: relative;
                    height: 24px;
                    margin-left: 10px;
                    margin-top: 50px;
                    input{
                        width:100%;
                        height: 100%;
                        position: absolute;
                        left:0;
                        top:0;
                        opacity: 0;
                        z-index: 2;
                    }
                }
            }
            .isColor-container{
                font-size: 12px;
                text-align: left;
                display: flex;
                justify-content: flex-start;
                align-content: center;
                line-height: 24px;
                padding-left: 5px;
                box-sizing: border-box;
                margin-bottom: 10px;
                .isColor{
                    width:50px;
                    height: 24px;
                    display: inline-block;
                    border: 1px solid #d5d5d5;
                    margin-left: 10px;
                    color: #323232;
                    text-align: center;
                }
            }
            .color-container{
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                padding-left: 5px;
                box-sizing: border-box;
            }
            .colorList{
                width:76px;
                height: 32px;
                display: inline-block;
                margin-bottom: 5px;
                margin-right: 5px;
                position: relative;
                border: 1px solid #d5d5d5;
                box-sizing: border-box;
                line-height: 32px;
                font-size: 12px;
                text-align: center;
                color: #323232;
                input{
                    width:100%;
                    height: 100%;
                    position: absolute;
                    left:0;
                    right: 0;
                    opacity: 0;
                }
            }
        }
        .chat-setting.active{
            transform: translateX(0);
        }
    }
</style>